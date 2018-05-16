export class CustomerInformation {
    mobile_no: string;
    alternate_mobile_no: string;
    email: string;

    CustomerInformation(mobile_no: string, alternate_mobile_no: string, email: string) {
        this.mobile_no = mobile_no;
        this.alternate_mobile_no = alternate_mobile_no;
        this.email = email;
        return this;
    }
}
