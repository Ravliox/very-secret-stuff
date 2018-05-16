export class User {
    title: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;

    User(title : string, first_name : string, middle_name : string, last_name : string, email : string, username : string, password : string) {
        this.title = title;
        this.first_name = first_name;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
