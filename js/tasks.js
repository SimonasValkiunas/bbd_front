
const taskDetails = document.getElementById('task-details');
const taskOutput = document.getElementById('task-output');
const modal = $('#myModal');

fetch('http://localhost:8000/tasks/')
    .then(response => response.json())
    .then(tasks => {
        $('#task-table').DataTable({
            data: tasks,
            columns: [
                { title: 'Task ID', data: 'task_id' },
                { title: 'Start Time', data: 'start_time' },
                { title: 'End Time', data: 'end_time' },
                { title: 'Status', data: 'status' },
                { title: 'URL', data: 'url' },
            ],
            rowCallback: function(row, task) {
                $(row).on('click', function() {
                    taskDetails.innerHTML = `<p>Task ID: ${task.task_id}</p>
                                                <p>Start Time: ${task.start_time}</p>
                                                <p>End Time: ${task.end_time}</p>
                                                <p>Status: ${task.status}</p>
                                                <p>URL: ${task.url}</p>
                                                <p>Headers: ${JSON.stringify(task.headers)}</p>
                                                <p>Body: ${task.body}</p>`;
                    const socket = new WebSocket(`ws://localhost:8000/ws/tasks/${task.task_id}/`);
                    
                    socket.onmessage = function(event) {
                        console.log(event.data)
                        taskOutput.textContent += event.data + '\n';
                    }
                    modal.modal('show');
                });
            }
        });
    });

document.querySelector('#stopAllTasks').addEventListener('click',() => {
    fetch('http://localhost:8000/stop_task/',{
        method: "POST"
    })
    .then(function() {
        location.reload();
    });
});

modal.on('hidden.bs.modal',() => {
    taskOutput.textContent = '';
})
