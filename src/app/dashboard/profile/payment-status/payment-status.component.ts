import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {

  // paymentSuccessful: boolean;
  // paymentId: string | null;
  // referenceId: string | null;

  paymentSuccessful: boolean = false;
  paymentId: string = '';
  paymentRequestId: string = '';



  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['payment_status'] === 'Credit') {
        this.paymentSuccessful = true;
        this.paymentId = params['payment_id'];
        this.paymentRequestId = params['payment_request_id'];
      }
    });

    

    // this.paymentSuccessful = this.route.snapshot.queryParams['payment_status'] === 'Credit';

    
    // // Extract payment ID and reference ID from URL query params
    // this.paymentId = this.route.snapshot.queryParamMap.get('payment_id');
    // this.referenceId = this.route.snapshot.queryParamMap.get('payment_request_id');

    // // this.router.navigate(['/dashboard/profile']);
  }


 
}
