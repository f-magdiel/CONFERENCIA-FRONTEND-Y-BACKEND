from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)

# Permitir peticiones desde cualquier origen
CORS(app)

# Configurar la conexión a la base de datos MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="admin2024",
    database="conferencia"
)

# Crear un cursor para ejecutar consultas SQL
cursor = db.cursor()

# Ruta para obtener todas las tareas
@app.route('/tasks', methods=['GET'])
def get_tasks():
    cursor.execute("SELECT * FROM conferencia.tasks")
    print(cursor)
    tasks = cursor.fetchall()
    tasks_list = []
    for task in tasks:
        task_dict = {
            'id': task[0],
            'titulo': task[1],
            'completed': task[2]
        }
        tasks_list.append(task_dict)
    return jsonify(tasks_list)

# Ruta para crear una nueva tarea
@app.route('/tasks', methods=['POST'])
def create_task():
    print("Se agregara una nueva tarea")
    data = request.json
    print(data)
    titulo = data['titulo']
    completed = data['completed']
    cursor.execute("INSERT INTO tasks (titulo, completed) VALUES (%s, %s)", (titulo, completed))
    db.commit()
    return jsonify({"message": "Tarea creada correctamente"})

# Ruta para actualizar una tarea existente
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    print(data)
    titulo = data['titulo']
    cursor.execute("UPDATE tasks SET titulo = %s WHERE id = %s", (titulo, task_id))
    db.commit()
    return jsonify({"message": "Tarea actualizada correctamente"})

# Ruta para eliminar una tarea existente
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    db.commit()
    
    return jsonify({"message": "Tarea eliminada correctamente"})

if __name__ == '__main__':
    app.run(debug=True)
