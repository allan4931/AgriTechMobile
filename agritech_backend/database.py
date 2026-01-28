import sqlite3

def get_db_connection():
    conn = sqlite3.connect('agritech.db')
    # This line is CRITICAL: It allows accessing columns by name
    conn.row_factory = sqlite3.Row 
    return conn

def init_db():
    conn = get_db_connection()
    # Create Farmer Records Table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS farmer_records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_name TEXT,
            id_number TEXT,
            phone_number TEXT,
            crop_type TEXT,
            farm_size TEXT,
            clerk_email TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    # Create Users Table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT,
            full_name TEXT,
            role TEXT
        )
    ''')
    conn.commit()
    conn.close()