import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { AccountService } from "../../data/services/account.service";
import { Log } from "../../data/types/log";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DatePipe } from "@angular/common";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-account-logs",
  templateUrl: "./account-logs.component.html",
  styleUrls: ["./account-logs.component.sass"],
})
export class AccountLogsComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "time",
    "username",
    "requesttip",
    "activity",
  ];
  accountId: number;
  username: string;
  logs: Log[] = [];
  dialyLogs: Log[] = [];
  isLoading: boolean = true;

  dataSource!: MatTableDataSource<Log>;
  selection = new SelectionModel<Log>(true, []);

  currentUserName: any;
  currentDate: Date = new Date();
  transCurrentDate: any;

  Form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private datepipe: DatePipe,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    //this.currentUserName = this.tokenStorage.getUser().username;

    this.Form = this.fb.group({
      stime: [this.currentDate, Validators.required],
    });

    this.activatedRoute.params.subscribe((param) => {
      this.accountId = param.id;
      console.log(this.accountId);
    });

    this.getAccountUsername(this.accountId);
    // this.transCurrentDate = this.datepipe.transform(
    //   this.currentDate,
    //   "yyyy/MM/dd"
    // );
  }

  getAccountUsername(id) {
    this.accountService
      .getUserById(id)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          //console.log(res);

          this.username = res.username;
          console.log(this.username);

          let event = { value: this.Form.value.stime };
          this.selectDate(event);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  selectDate(event: any) {
    this.dataSource = null;
    this.isLoading = true;

    this.transCurrentDate = this.datepipe.transform(event.value, "yyyy-MM-dd");
    console.log(this.username);
    console.log(this.transCurrentDate);

    this.accountService
      .getDailyAccountLogs(this.username, this.transCurrentDate)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);
          this.dialyLogs = res;

          if (this.dialyLogs) {
            this.isLoading = false;

            this.dataSource = new MatTableDataSource(this.dialyLogs);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err) => {
          console.log(err);
        }
      );

    //console.log();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Log) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
