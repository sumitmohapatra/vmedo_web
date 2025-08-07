import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {
  constructor(private agentService: AgentService, private common: CommonService, private router: Router) { }

  Math = Math;

  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';

  currentPage = 1;
  itemsPerPage = 5;
  showAddCustomerModal = false;
  @ViewChild('createCustomerModal') createCustomerModal: any;
  createCustomerModalRef:any;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    const agentId = this.agentService.getAgentId();
    this.agentService.getRegisteredUsers(agentId).subscribe({
      next: (res: any) => {
        this.users = res.objret || [];
        this.filteredUsers = [...this.users];  // Initialize filtered users
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  // 🔍 Filter function (called on input)
  filterUsers() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.uName?.toLowerCase().includes(query) ||
        user.uEmail?.toLowerCase().includes(query) ||
        user.uMobile?.toString().includes(query)
      );
    }

    this.currentPage = 1; // Reset to first page on new search
  }

  // 🔢 Pagination values based on filteredUsers
  get totalItems() {
    return this.filteredUsers.length;
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
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
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

  openAddCustomer() {
    this.createCustomerModalRef = this.common.modal.OpenModal(this.createCustomerModal);
    this.showAddCustomerModal = true;
  }

  closeAddCustomer() {
    this.showAddCustomerModal = false;
  }

  upgradePlan() {
    this.common.viewSubscription('All');
    this.router.navigate(['/dashboard/package']);
  }

  createCard(user:any) {
    this.router.navigate(['agent/create-suraksha-card']);
    const userInfo:any = JSON.parse(localStorage.getItem('agentInfo'));
    userInfo.userID = user.userID;
    localStorage.setItem('userID', userInfo.userID);
    localStorage.setItem('auth_token', userInfo.autToken);
    localStorage.setItem('refresh_token', userInfo.refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  openEditModal(user: any) {
    console.log('Editing user:', user);

    // Implement modal logic
  }


}
