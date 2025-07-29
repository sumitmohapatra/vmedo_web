import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent {
  Math = Math;

  users: any[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      avatar: 'https://i.pravatar.cc/100?img=1',
      registeredOn: '2023-01-15',
      mobileNumber: '9876543210',
      validTill: '2024-01-15',
      plan: 'vmedo premium',
      userType: 'premium',
    },
    {
      id: 2,
      name: 'Brian Carter',
      email: 'brian.carter@example.com',
      avatar: 'https://i.pravatar.cc/100?img=2',
      registeredOn: '2023-03-10',
      mobileNumber: '9876501234',
      validTill: '2024-03-10',
      plan: 'free',
      userType: 'free',
    },
    {
      id: 3,
      name: 'Cynthia Lee',
      email: 'cynthia.lee@example.com',
      avatar: 'https://i.pravatar.cc/100?img=3',
      registeredOn: '2023-06-20',
      mobileNumber: '9876549876',
      validTill: '2024-06-20',
      plan: 'individual',
      userType: 'premium',
    },
    {
      id: 4,
      name: 'Daniel Adams',
      email: 'daniel.adams@example.com',
      avatar: 'https://i.pravatar.cc/100?img=4',
      registeredOn: '2023-02-05',
      mobileNumber: '9876523456',
      validTill: '2024-02-05',
      plan: 'family plus',
      userType: 'premium',
    },
    {
      id: 5,
      name: 'Eva Williams',
      email: 'eva.williams@example.com',
      avatar: 'https://i.pravatar.cc/100?img=5',
      registeredOn: '2023-05-12',
      mobileNumber: '9876589012',
      validTill: '2024-05-12',
      plan: 'free',
      userType: 'free',
    },
    {
      id: 6,
      name: 'Frank Miller',
      email: 'frank.miller@example.com',
      avatar: 'https://i.pravatar.cc/100?img=6',
      registeredOn: '2023-07-30',
      mobileNumber: '9876598765',
      validTill: '2024-07-30',
      plan: 'vmedo premium',
      userType: 'premium',
    },
    {
      id: 7,
      name: 'Grace Kim',
      email: 'grace.kim@example.com',
      avatar: 'https://i.pravatar.cc/100?img=7',
      registeredOn: '2023-08-22',
      mobileNumber: '9876534567',
      validTill: '2024-08-22',
      plan: 'individual',
      userType: 'premium',
    },
    {
      id: 8,
      name: 'Henry Clark',
      email: 'henry.clark@example.com',
      avatar: 'https://i.pravatar.cc/100?img=8',
      registeredOn: '2023-09-18',
      mobileNumber: '9876512345',
      validTill: '2024-09-18',
      plan: 'family plus',
      userType: 'premium',
    }
  ];
  
  openEditModal(user: any) {
    console.log('Editing user:', user);
    // Optionally open a modal with user data
  }


currentPage = 1;
itemsPerPage = 5;

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
