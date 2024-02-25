import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  users:any[]=[]
  type:string="students"
  constructor(private fb:FormBuilder , private AuthService:AuthService , private router:Router ) { }
  ngOnInit(): void {
    this.getUsers()
    this.creatForm()
  }

    // function to creat user form
    creatForm(){
      this.loginForm = this.fb.group({
        type : [this.type],
        email:['',[Validators.required , Validators.email]],
        password:['',[Validators.required]],
      })
    }
    // change role student => doctor
    getRole(event:any){
      this.type = event.value;
      this.getUsers()
    }
  getUsers():void{
    this.AuthService.getAllUsers(this.type).subscribe({
      next:(res)=>{
        this.users = res
        console.log(this.users)
      }
    })
  }

  submit(){
    let index = this.users.findIndex(item => item.email == this.loginForm.value.email &&
      item.password == this.loginForm.value.password)
    if(index == -1){
      alert("الايميل او كلمة المرور غير صحيحة")
    }else{
      const model ={
        username : this.users[index].username,
        rolr : this.type
      }
      this.AuthService.login(model).subscribe({
        next:(res)=>{
          console.log(res)
          // alert( `مرحبا ${model.username}`)
          this.router.navigate(['/subjects'])
        },
        error:(err)=>{
          console.log(err) 
        }
      })
    }
  }


}
