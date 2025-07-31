import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  constructor(private agentService:AgentService, private common:CommonService){}
  Math = Math;

  users: any[] = [
  ];
  
  
  openEditModal(user: any) {
    console.log('Editing user:', user);
    // Optionally open a modal with user data
  }


currentPage = 1;
itemsPerPage = 5;

ngOnInit(){
  this.loadUsers();
}

loadUsers() {
  const agentId = this.common.userInfo.userID;
  this.agentService.getRegisteredUsers(agentId).subscribe({
    next: (res:any) => {
       this.users = res.objret || [];
    },
    error: (err) => {
    }
  });
}

get totalItems() {
  return this.users.length;
}

get totalPages() {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

get pageNumbers() {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

get currentPageStart() {
  return (this.currentPage - 1) * this.itemsPerPage + 1;
}

get currentPageEnd() {
  return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
}

get paginatedUsers() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.users.slice(start, start + this.itemsPerPage);
}

goToPage(page: number) {
  this.currentPage = page;
}

goToPreviousPage() {
  if (this.currentPage > 1) this.currentPage--;
}

goToNextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

showAddCustomerModal = false;

openAddCustomer() {
  this.showAddCustomerModal = true;
}

closeAddCustomer() {
  this.showAddCustomerModal = false;
}

}
