from flask import Flask, render_template, request, redirect, url_for, flash,jsonify
import mysql.connector
from mysql.connector import IntegrityError

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your actual secret key

# Database configuration



# Function to connect to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12112003",
    database="hostel"
)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    user_type = request.form['user_type']
    username = request.form['uname']
    password = request.form['psw']
    
    connection = db
    cursor = connection.cursor(dictionary=True)
    
    # Query to check user credentials and type
    query = "SELECT * FROM users WHERE username = %s AND password = %s AND user_type = %s"
    cursor.execute(query, (username, password, user_type))
    user = cursor.fetchone()
    
    if user:
        if user_type == 'student':
            return redirect(url_for('student_page'))
        elif user_type == 'admin':
            return redirect(url_for('admin_page'))
    else:
        flash("Invalid credentials. Please try again.", "danger")
        return redirect(url_for('login_page'))

    cursor.close()
    connection.close()
    
@app.route('/submit', methods=['POST'])
def submit():
    # Collect data for four students
    students = []
    for i in range(4):
        name = request.form.get(f'name_{i}')
        roll_no = request.form.get(f'roll_no_{i}')
        department = request.form.get(f'department_{i}')
        mobile = request.form.get(f'mobile_{i}')
        parent_mobile = request.form.get(f'parent_mobile_{i}')
        email = request.form.get(f'email_{i}')
        year = request.form.get(f'year_{i}')
        payment = request.form.get(f'payment_{i}')
        if name and roll_no and department and mobile and parent_mobile and email and year and payment:
            students.append({
                'name': name,
                'roll_no': roll_no,
                'department': department,
                'mobile': mobile,
                'parent_mobile': parent_mobile,
                'email': email,
                'year': year,
                'payment' : payment
            })

    hostel_name = request.form['hostel']
    room_no = int(request.form['room_no'])

    # Check if we have exactly 4 students filled out
    if len(students) != 4:
        return'Please enter details for exactly 4 students.'
        

    # Establish database connection

    cursor = db.cursor()

    # Check room availability
    cursor.execute("SELECT current_occupancy, is_available FROM rooms WHERE hostel_name = %s AND room_no = %s", (hostel_name, room_no))
    room = cursor.fetchone()
    
    if not room:
        
        cursor.close()
        return 'Selected room does not exist.'

    current_occupancy, is_available = room
    if current_occupancy + len(students) > 4 or not is_available:
  
        cursor.close()
        return 'Room is full or not available.'
    for student in students:
        cursor.execute("SELECT COUNT(*) FROM students WHERE roll_no = %s", (student['roll_no'],))
        if cursor.fetchone()[0] > 0:
            cursor.close()
            return f"Roll number {student['roll_no']} is already registered."
    for student in students:
        cursor.execute("SELECT COUNT(*) FROM students WHERE payment = %s", (student['payment'],))
        if cursor.fetchone()[0] > 0:
            cursor.close()
            return f"payment id {student['payment']} is already registered."
    for student in students:
        cursor.execute("SELECT COUNT(*) FROM students WHERE mobile = %s", (student['mobile'],))
        if cursor.fetchone()[0] > 0:
            cursor.close()
            return f"mobile number {student['mobile']} is already registered."
        
    for student in students:
        cursor.execute("SELECT COUNT(*) FROM students WHERE parent_mobile = %s", (student['parent_mobile'],))
        if cursor.fetchone()[0] > 0:
            cursor.close()
            return f"parent mobile number {student['parent_mobile']} is already registered."
    # Insert each student and update room occupancy
    for student in students:
        cursor.execute("""
            INSERT INTO students (name, roll_no, department, mobile, parent_mobile, email, year, payment, hostel_name, room_no)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (student['name'], student['roll_no'], student['department'], student['mobile'], student['parent_mobile'], student['email'], student['year'], student['payment'] , hostel_name, room_no))

    # Update room occupancy and availability
    new_occupancy = current_occupancy + len(students)
    is_available = new_occupancy < 4
    cursor.execute("UPDATE rooms SET current_occupancy = %s, is_available = %s WHERE hostel_name = %s AND room_no = %s", (new_occupancy, is_available, hostel_name, room_no))

    # Commit changes and close the connection
    db.commit()
    cursor.close()

   
    return 'Room booked successfully for 4 students.'


@app.route('/book_room', methods=['POST'])
def book_room():
    data = request.get_json()
    roll_number = data.get('roll_number')
    hostel_name = data.get('hostel')
    room_number = data.get('room_id')
    payment = data.get('payment')
    try:
        cursor = db.cursor()

        # 1. Check if the roll number is already registered
        cursor.execute(
            "SELECT * FROM students WHERE payment = %s", (payment,)
        )
        student = cursor.fetchone()
        
        if student:
            return "This payment id is already registered. Please use a unique roll number."
            #return jsonify({"status": "fail", "message": "This roll number is already registered. Please use a unique roll number."})
        cursor.execute(
            "SELECT * FROM students WHERE payment = %s", (payment,)
        )
        student = cursor.fetchone()
        
        if student:
            return "This payment id is already registered. Please use a unique roll number."
         
        # 2. Check if the room is available
        cursor.execute(
            "SELECT * FROM rooms WHERE hostel_name = %s AND room_no = %s AND is_available = TRUE",
            (hostel_name, room_number)
        )
        room = cursor.fetchone()

        if not room:
            return "Room is already occupied or doesn't exist. Please select a different room."
            #return jsonify({"status": "fail", "message": "Room is already occupied or doesn't exist. Please select a different room."})

        # 3. Insert student information into the students table
        cursor.execute(
            """
            INSERT INTO students (name, roll_no, department, mobile, parent_mobile, email, year, payment ,hostel_name, room_no) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (data['name'], roll_number, data['department'], data['mobile'], data['parent_mobile'], data['email'], data['year'], data['payment'], hostel_name, room_number)
        )

        # 4. Mark the room as occupied in the rooms table
        cursor.execute(
            "UPDATE rooms SET is_available = FALSE WHERE hostel_name = %s AND room_no = %s",
            (hostel_name, room_number)
        )
        
        db.commit()
        return "Room booked successfully!"
        #return jsonify({"status": "success", "message": "Room booked successfully!"})

    except IntegrityError as e:
        # Handle any database errors (e.g., unique constraint violation)
        if "unique_roll_no" in str(e):
            return "This roll number is already registered. Please use a unique roll number."
            #return jsonify({"status": "fail", "message": "This roll number is already registered. Please use a unique roll number."})
        return "An error occurred. Please try again."
        #return jsonify({"status": "fail", "message": "An error occurred. Please try again."})
    
    finally:
        cursor.close()

@app.route('/outpass', methods=['POST'])
def outpass():
    if request.method == 'POST':
        name = request.form['name']
        roll_number = request.form['roll_number']
        hostel = request.form['hostel']
        room_number = request.form['room_number']
        mobile_number = request.form['mobile_number']
        destination = request.form['destination']
        reason = request.form['reason']
        leave_date = request.form['leave_date']
        return_date = request.form['return_date']
        
        # Establish database connection
        
        cursor = db.cursor()

        # Insert data into the table
        try:
            cursor.execute("""
                INSERT INTO outpasses (name, roll_number, hostel, room_number, mobile_number, destination, reason, leave_date, return_date)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (name, roll_number, hostel, room_number, mobile_number, destination, reason, leave_date, return_date))
            db.commit()
            flash("Outpass request submitted successfully!", "success")
        except mysql.connector.Error as err:
            flash(f"Error: {err}", "danger")
            db.rollback()
        finally:
            cursor.close()

        return "Outpass request submitted successfully!"

@app.route('/available_rooms')
def available_rooms():
    hostel = request.args.get('hostel')
    cursor = db.cursor()
    cursor.execute("SELECT room_no FROM rooms WHERE hostel_name = %s AND is_available = TRUE", (hostel,))
    rooms = [room[0] for room in cursor.fetchall()]
    cursor.close()
    return jsonify({"rooms": rooms})
@app.route('/feedback', methods=['POST'])
def feedback():
    if request.method == 'POST':
        name = request.form['name']
        roll = request.form['roll']
        email = request.form['email']
        hostel = request.form['hostel']
        room = request.form['room']
        comments = request.form['comments']
        improvements = request.form['improvements']
        
        # Establish database connection
        cursor = db.cursor()

        # Insert data into the table
        try:
            cursor.execute("""
                INSERT INTO feedback (name, roll, email,hostel, room, comments, improvements)
                VALUES (%s, %s, %s,%s, %s, %s, %s)
            """, (name, roll, email,hostel, room, comments, improvements))
            db.commit()
            flash("Feedback submitted successfully!", "success")
        except mysql.connector.Error as err:
            flash(f"Error: {err}", "danger")
            db.rollback()
        finally:
            cursor.close()

        return "Feedback submitted successfully!"
@app.route('/washing', methods=['POST'])
def washing():
    if request.method == 'POST':
        name = request.form['name']
        roll_number = request.form['roll_number']
        hostel = request.form['hostel']
        room_number = request.form['room_number']
        contact_number = request.form['contact_number']
        time_slot = request.form['time_slot']
        
        # Establish database connection
        
        cursor = db.cursor()

        # Insert data into the table
        try:
            cursor.execute("""
                INSERT INTO bookings (name, roll_number, hostel, room_number, contact_number, time_slot)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (name, roll_number, hostel, room_number, contact_number, time_slot))
            db.commit()
            flash("Booking submitted successfully!", "success")
        except mysql.connector.Error as err:
            flash(f"Error: {err}", "danger")
            db.rollback()
        finally:
            cursor.close()

        return 'Booking submitted successfully!'
@app.route('/studentdetails')
def fetch_students():
    search_query = request.args.get('search', default='', type=str)
    selected_hostel = request.args.get('hostel', default='', type=str)
    selected_room = request.args.get('room', default='', type=str)
    
    try:
        cursor = db.cursor(dictionary=True)
        
        # Fetch all hostels and rooms for filters
        cursor.execute("SELECT DISTINCT hostel_name FROM students")
        hostels = [row['hostel_name'] for row in cursor.fetchall()]
        cursor.execute("SELECT DISTINCT room_no FROM students")
        rooms = [row['room_no'] for row in cursor.fetchall()]
        
        # Build the query dynamically based on filters
        query = "SELECT * FROM students WHERE 1=1"
        params = []

        if search_query:
            query += " AND (id LIKE %s OR name LIKE %s OR roll_no LIKE %s)"
            search_pattern = f"%{search_query}%"
            params.extend([search_pattern, search_pattern, search_pattern])
        if selected_hostel:
            query += " AND hostel_name = %s"
            params.append(selected_hostel)
        if selected_room:
            query += " AND room_no = %s"
            params.append(selected_room)
        
        cursor.execute(query, tuple(params))
        students = cursor.fetchall()
    except Exception as e:
        students = []
        hostels = []
        rooms = []
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
    
    return render_template(
        'students.html',
        students=students,
        hostels=hostels,
        rooms=rooms,
        selected_hostel=selected_hostel,
        selected_room=selected_room,
    )

# Define separate routes for the student and admin pages

@app.route('/outpass_details')
def outpasses():
    search_query = request.args.get('search', default='', type=str)
    selected_hostel = request.args.get('hostel', default='', type=str)
    selected_room = request.args.get('room', default='', type=str)
    
    try:
        cursor = db.cursor(dictionary=True)
        
        # Fetch all hostels and rooms for filters
        cursor.execute("SELECT DISTINCT hostel FROM outpasses")
        hostels = [row['hostel'] for row in cursor.fetchall()]
        cursor.execute("SELECT DISTINCT room_number FROM outpasses")
        rooms = [row['room_number'] for row in cursor.fetchall()]
        
        # Build the query dynamically based on filters
        query = "SELECT * FROM outpasses WHERE 1=1"
        params = []

        if search_query:
            query += " AND (id LIKE %s OR name LIKE %s OR roll_number LIKE %s)"
            search_pattern = f"%{search_query}%"
            params.extend([search_pattern, search_pattern, search_pattern])
        if selected_hostel:
            query += " AND hostel = %s"
            params.append(selected_hostel)
        if selected_room:
            query += " AND room_number = %s"
            params.append(selected_room)
        
        cursor.execute(query, tuple(params))
        outpasses = cursor.fetchall()
    except Exception as e:
        outpasses = []
        hostels = []
        rooms = []
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
    
    return render_template(
        'outpass_details.html',
        outpasses=outpasses,
        hostels=hostels,
        rooms=rooms,
        selected_hostel=selected_hostel,
        selected_room=selected_room,
    )

@app.route('/feedback_details')
def feedbacks():
    search_query = request.args.get('search', default='', type=str)
    selected_hostel = request.args.get('hostel', default='', type=str)
    selected_room = request.args.get('room', default='', type=str)
    
    try:
        cursor = db.cursor(dictionary=True)
        
        # Fetch all hostels and rooms for filters
        cursor.execute("SELECT DISTINCT hostel FROM feedback")
        hostels = [row['hostel'] for row in cursor.fetchall()]
        cursor.execute("SELECT DISTINCT room FROM feedback")
        rooms = [row['room'] for row in cursor.fetchall()]
        
        # Build the query dynamically based on filters
        query = "SELECT * FROM feedback WHERE 1=1"
        params = []

        if search_query:
            query += " AND (name LIKE %s OR roll LIKE %s OR email LIKE %s)"
            search_pattern = f"%{search_query}%"
            params.extend([search_pattern, search_pattern, search_pattern])
        if selected_hostel:
            query += " AND hostel = %s"
            params.append(selected_hostel)
        if selected_room:
            query += " AND room = %s"
            params.append(selected_room)
        
        cursor.execute(query, tuple(params))
        feedback_data = cursor.fetchall()
    except Exception as e:
        feedback_data = []
        hostels = []
        rooms = []
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
    
    return render_template(
        'feedback_details.html',
        feedback=feedback_data,
        hostels=hostels,
        rooms=rooms,
        selected_hostel=selected_hostel,
        selected_room=selected_room,
    )


@app.route('/washing_details')
def washings():
    search_query = request.args.get('search', default='', type=str)
    selected_hostel = request.args.get('hostel', default='', type=str)
    selected_room = request.args.get('room', default='', type=str)
    
    try:
        cursor = db.cursor(dictionary=True)
        
        # Fetch all hostels and rooms for filters
        cursor.execute("SELECT DISTINCT hostel FROM bookings")
        hostels = [row['hostel'] for row in cursor.fetchall()]
        cursor.execute("SELECT DISTINCT room_number FROM bookings")
        rooms = [row['room_number'] for row in cursor.fetchall()]
        
        # Build the query dynamically based on filters
        query = "SELECT * FROM bookings WHERE 1=1"
        params = []

        if search_query:
            query += " AND (name LIKE %s OR roll_number LIKE %s OR contact_number LIKE %s)"
            search_pattern = f"%{search_query}%"
            params.extend([search_pattern, search_pattern, search_pattern])
        if selected_hostel:
            query += " AND hostel = %s"
            params.append(selected_hostel)
        if selected_room:
            query += " AND room_number = %s"
            params.append(selected_room)
        
        cursor.execute(query, tuple(params))
        booking_data = cursor.fetchall()
    except Exception as e:
        booking_data = []
        hostels = []
        rooms = []
        print(f"Error: {e}")
    finally:
        if cursor:
            cursor.close()
    
    return render_template(
        'washing_details.html',
        bookings=booking_data,
        hostels=hostels,
        rooms=rooms,
        selected_hostel=selected_hostel,
        selected_room=selected_room,
    )

      



@app.route('/hostel_room_booking.html', endpoint='index')
def index():
    return render_template('hostel_room_booking.html')

@app.route('/student')
def student_page():
    return render_template('home.html')
@app.route('/service.html')
def service():
    return render_template('service.html')
@app.route('/contact.html')
def contact():
    return render_template('contact.html')
@app.route('/home.html')
def homes():
    return render_template('home.html')
@app.route('/hostel_room_booking.html')
def hostel_room_booking():
    return render_template('hostel_room_booking.html')
@app.route('/out_pass.html')
def out_pass():
    return render_template('out_pass.html')
@app.route('/feedbackform.html')
def feedbackform():
    return render_template('feedbackform.html')
@app.route('/washingmachine.html')
def washingmachine():
    return render_template('washingmachine.html')
@app.route('/admin')
def admin_page():
    return fetch_students()
@app.route('/outpass_details')
def outpass_page():
    return outpasses()
@app.route('/feedback_details')
def feedback_page():
    return feedbacks()

@app.route('/washing_details')
def washing_page():
    return washings()
# Define a route for the login page (GET request)
@app.route('/login_page')
def login_page():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
