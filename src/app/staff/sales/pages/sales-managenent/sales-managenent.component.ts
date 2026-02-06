import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableExporterDirective } from 'mat-table-exporter';

@Component({
  selector: 'app-sales-managenent',
  templateUrl: './sales-managenent.component.html',
  styleUrls: ['./sales-managenent.component.sass']
})
export class SalesManagenentComponent implements OnInit {
  displayedColumns: string[] = [
    //'select',
    // 'id',
    'farmer_no',
    'username',
    'payment_mode',
    'freequency',
    'allocationAmount',
    // 'mobile_no',
    'collectionAmount',
    'netPay',
    // 'action',
  ];

  displayedColumns1: string[] = ['id','farmer_no', 'username', 'payment_mode', 'freequency', 'allocationAmount', 'collectionAmount', 'netPay', /*'actions'*/];

  subscription!: Subscription;
  startDate: Date | null = null;
  endDate: Date | null = null;
  allData: any[] = [];

  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild(MatTableExporterDirective, { static: false }) exporter!: MatTableExporterDirective;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: SalesService
  ) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.getData();
  }

  getData() {
    this.isLoading = true;
    console.log('Fetching payment records...');
    this.service.getFarmersPaymentRecords().subscribe({
      next: (res) => {
        this.data = res;
        console.log('Response received:', res);

        if (this.data.entity.length > 0) {
          this.isLoading = false;
          this.isdata = true;
          this.allData = this.data.entity;
          console.log('Total records fetched:', this.allData.length);

          this.dataSource = new MatTableDataSource(this.allData);
          this.dataSource1 = new MatTableDataSource(this.allData);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        } else {
          this.isLoading = false
          this.isdata = false;
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
          this.isLoading = false
          this.isdata = false;
          this.dataSource = new MatTableDataSource([]);
      },
      complete: () => {
          this.isLoading = false
          this.isdata = false;
          this.dataSource = new MatTableDataSource([]);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log('Applying filter:', filterValue);
    this.dataSource1.filter = filterValue;

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      console.log('Filtering between:', this.startDate, 'and', this.endDate);
      const filtered = this.allData.filter(item => {
        const itemDate = new Date(item.date); // Adjust 'date' if necessary
        return itemDate >= this.startDate! && itemDate <= this.endDate!;
      });
      this.dataSource = new MatTableDataSource(filtered);
    } else {
      console.log('No date filter applied. Resetting to all data.');
      this.dataSource = new MatTableDataSource(this.allData);
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    const allSelected = numSelected === numRows;
    console.log('Is all selected:', allSelected);
    return allSelected;
  }

  masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
    console.log('Selection toggled. Current selection:', this.selection.selected);
  }

  requestDetailsCall(row: any): void {
    console.log('Request details for:', row);
    // Add modal/dialog logic if needed
  }

  pay(): void {
    console.log('Pay function triggered');
    // Implement actual payment logic here
  }

  onContextMenu(event: MouseEvent, request: any): void {
    event.preventDefault();
    console.log('Context menu event:', request);
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: request };
    this.contextMenu.openMenu();
  }
}
