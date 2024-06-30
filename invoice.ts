// invoice.ts
import promptSync from "prompt-sync";
const prompt = promptSync();

interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
}

class Invoice {
    items: InvoiceItem[];
    invoiceDate: Date;
    dueDate: Date;
    taxRate: number;

    constructor(items: InvoiceItem[], taxRate: number) {
        this.items = items;
        this.invoiceDate = new Date();
        this.dueDate = this.calculateDueDate(30); // Due in 30 days
        this.taxRate = taxRate;
    }

    calculateDueDate(days: number): Date {
        const dueDate = new Date(this.invoiceDate);
        dueDate.setDate(dueDate.getDate() + days);
        return dueDate;
    }

    calculateSubtotal(): number {
        return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    }

    calculateTax(): number {
        return this.calculateSubtotal() * (this.taxRate / 100);
    }

    calculateTotal(): number {
        return this.calculateSubtotal() + this.calculateTax();
    }

    generateInvoice(): string {
        let invoiceDetails = `Invoice Date: ${this.invoiceDate.toLocaleDateString()}\n`;
        invoiceDetails += `Due Date: ${this.dueDate.toLocaleDateString()}\n\n`;
        invoiceDetails += `Items:\n`;

        this.items.forEach(item => {
            invoiceDetails += `${item.description} - ${item.quantity} x $${item.unitPrice.toFixed(2)}\n`;
        });

        invoiceDetails += `\nSubtotal: $${this.calculateSubtotal().toFixed(2)}`;
        invoiceDetails += `\nTax: $${this.calculateTax().toFixed(2)}`;
        invoiceDetails += `\nTotal: $${this.calculateTotal().toFixed(2)}`;

        return invoiceDetails;
    }
}

function getUserInput(): InvoiceItem[] {
    const items: InvoiceItem[] = [];
    let moreItems = true;

    while (moreItems) {
        const description = prompt('Enter item description: ');
        const quantity = parseInt(prompt('Enter quantity: '), 10);
        const unitPrice = parseFloat(prompt('Enter unit price: '));

        items.push({ description, quantity, unitPrice });

        const more = prompt('Add another item? (yes/no): ');
        moreItems = more.toLowerCase() === 'yes';
    }

    return items;
}

const items = getUserInput();
const taxRate = parseFloat(prompt('Enter tax rate (%): '));
const invoice = new Invoice(items, taxRate);

console.log(invoice.generateInvoice());
