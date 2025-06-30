import {  Injectable } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) { }

  /**
   * OPEING A MODAL BOX
   * @param content 
   * @returns 
   */
  OpenModal = (content: any) => {
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      ariaLabelledBy: 'modal-basic-title'
    };
    return this.modalService.open(content, ngbModalOptions);
  };

  /**
   * CLOSING A MODAL BOX
   * @param modalRef 
   */
  CloseModal = (modalRef: any) => {
    modalRef.close();
  };

  CloseAllModal = () => {
    this.modalService.dismissAll();
  };
  
  /**
   * GETTING MODAL CLOSING REASON (ESC | BACKDROP | REASON)
   * @param reason 
   * @returns 
   */
  private GetDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
