"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// invoice.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class Invoice {
    constructor(items, taxRate) {
        this.items = items;
        this.invoiceDate = new Date();
        this.dueDate = this.calculateDueDate(30); // Due in 30 days
        this.taxRate = taxRate;
    }
    calculateDueDate(days) {
        const dueDate = new Date(this.invoiceDate);
        dueDate.setDate(dueDate.getDate() + days);
        return dueDate;
    }
    calculateSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    }
    calculateTax() {
        return this.calculateSubtotal() * (this.taxRate / 100);
    }
    calculateTotal() {
        return this.calculateSubtotal() + this.calculateTax();
    }
    generateInvoice() {
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
function getUserInput() {
    const items = [];
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
