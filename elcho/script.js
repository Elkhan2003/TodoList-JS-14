// In-memory storage for tasks
let todoTasks = [
	{ id: 1, category: "relaxation", task: "Start a daily journal" },
	{ id: 2, category: "cooking", task: "Make homemade ice cream" },
];

let doneTasks = [{ id: 3, category: "social", task: "Compliment someone" }];

let nextId = 4;

function renderTasks() {
	renderTodoTasks();
	renderDoneTasks();
}

function renderTodoTasks() {
	const todoSection = document.getElementById("todo-section");

	if (todoTasks.length === 0) {
		todoSection.innerHTML = '<div class="empty-state">No pending tasks</div>';
		return;
	}

	todoSection.innerHTML = todoTasks
		.map(
			(task) => `
                <div class="task-item">
                    <div class="task-content">
                        <div class="task-category">Category: ${task.category}</div>
                        <div class="task-text">Task: ${task.task}</div>
                    </div>
                    <div class="task-buttons">
                        <button onclick="markDone(${task.id})">Done</button>
                        <button onclick="cancelTask(${task.id})">Cancel</button>
                    </div>
                </div>
            `
		)
		.join("");
}

function renderDoneTasks() {
	const doneSection = document.getElementById("done-section");

	if (doneTasks.length === 0) {
		doneSection.innerHTML = '<div class="empty-state">No completed tasks</div>';
		return;
	}

	doneSection.innerHTML = doneTasks
		.map(
			(task) => `
                <div class="task-item">
                    <div class="task-content">
                        <div class="task-category">Category: ${task.category}</div>
                        <div class="task-text">Task: ${task.task}</div>
                    </div>
                    <div class="task-buttons">
                        <button onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </div>
            `
		)
		.join("");
}

function addTask() {
	const categoryInput = document.getElementById("category-input");
	const taskInput = document.getElementById("task-input");

	const category = categoryInput.value.trim();
	const task = taskInput.value.trim();

	if (!category || !task) {
		alert("Please fill in both category and task fields");
		return;
	}

	todoTasks.push({
		id: nextId++,
		category: category,
		task: task,
	});

	categoryInput.value = "";
	taskInput.value = "";

	renderTasks();
}

function markDone(taskId) {
	const taskIndex = todoTasks.findIndex((task) => task.id === taskId);
	if (taskIndex !== -1) {
		const task = todoTasks.splice(taskIndex, 1)[0];
		doneTasks.push(task);
		renderTasks();
	}
}

function cancelTask(taskId) {
	todoTasks = todoTasks.filter((task) => task.id !== taskId);
	renderTasks();
}

function deleteTask(taskId) {
	doneTasks = doneTasks.filter((task) => task.id !== taskId);
	renderTasks();
}

// Handle Enter key in input fields
document
	.getElementById("category-input")
	.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			document.getElementById("task-input").focus();
		}
	});

document
	.getElementById("task-input")
	.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			addTask();
		}
	});

// Initial render
renderTasks();
