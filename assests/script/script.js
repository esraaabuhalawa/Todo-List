const storage_key = "todo-app";
new Vue ({
    'el' : '#app',
    data(){
        return {
            dark: true,
            todoText: '',
            subject:'',
            visibilty : 'all',
            editable:'',
            edit:false,
            
        todos : [
            {title:'todo1',completed:false},
            {title:'todo2',completed:true},
            {title:'todo3',completed:false}
        ],
        switchClass:'false',
        }
    },
    created(){
        this.todos = JSON.parse(localStorage.getItem(storage_key) || '[]')
    },
    methods: {
        addTodo(){
            if(this.subject != ''){
                this.todos.push({
                    title:this.subject,
                    completed:false,
                })
                localStorage.setItem(storage_key,JSON.stringify(this.todos));
            }   
        },
        deleteTodo(item){
            this.todos.splice(this.todos.indexOf(item),1)
            localStorage.setItem(storage_key,JSON.stringify(this.todos));
        },
        clearComplete(){
            this.todos = this.todos.filter((item) => {return item.completed === false});
        },
        toggleClass(){
            var element = document.body;
            element.dataset.bsTheme =
            element.dataset.bsTheme == "light" ? "dark" : "light";
            this.switchClass = !this.switchClass
        },
        handleInput(e){

           this.editable = e.target.innerText;
        },
        endEdit(){
            this.$el.querySelector('.editme').blur()
            
            console.log("title edit== " +todo.title);
           // localStorage.setItem(storage_key,JSON.stringify(this.todos));
         },
        editTodo(todo){
            todo.title = this.editable;
            localStorage.setItem(storage_key,JSON.stringify(this.todos));
        }
    },
    computed:{
        todoNum(){
            let leftItems = this.todos.filter((item) => {return item.completed === false});
            return leftItems.length
        },
        filteredTodos(){
            let filterTodos = [];
            if(this.visibilty == 'all'){
                filterTodos = this.todos
            }else if(this.visibilty == 'active'){
                filterTodos = this.todos.filter((item) => {return !item.completed})
            }else if(this.visibilty == 'completed'){
                filterTodos = this.todos.filter((item) => {return item.completed})
            }
            return filterTodos
        }
    },   
})
