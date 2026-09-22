import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexTooltip, ApexXAxis } from 'ng-apexcharts';
import { forkJoin } from 'rxjs';
import { FarmerAnalyticsResponse, FarmerService } from '../../services/farmer.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

interface FarmerAnalyticsRow {
  username: string;
  farmer_no: number | string;
  mobile_no: string;
  route: string;
  pickUpLocation: string;
  totalQuantity?: number;
}

interface FarmerRankingChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
}

@Component({
  selector: 'app-farmer-analytics',
  templateUrl: './farmer-analytics.component.html',
  styleUrls: ['./farmer-analytics.component.scss']
})
export class FarmerAnalyticsComponent implements OnInit {
  filterForm: FormGroup;
  loading = false;
  hasLoaded = false;
  dormantCount = 0;
  activeCount = 0;
  topCount = 0;
  bottomCount = 0;
  dormantFarmers: FarmerAnalyticsRow[] = [];
  activeFarmers: FarmerAnalyticsRow[] = [];
  topFarmers: FarmerAnalyticsRow[] = [];
  bottomFarmers: FarmerAnalyticsRow[] = [];
  dormantDataSource = new MatTableDataSource<FarmerAnalyticsRow>([]);
  activeDataSource = new MatTableDataSource<FarmerAnalyticsRow>([]);
  topChartOptions: Partial<FarmerRankingChartOptions>;
  bottomChartOptions: Partial<FarmerRankingChartOptions>;

  readonly statusColumns = ['farmer', 'farmerNumber', 'phone', 'route', 'location'];

  @ViewChild('dormantPaginator', { static: false }) dormantPaginator: MatPaginator;
  @ViewChild('activePaginator', { static: false }) activePaginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private farmerService: FarmerService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      months: [3, [Validators.required, Validators.min(1), Validators.max(12)]]
    });
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    if (this.filterForm.invalid) {
      this.filterForm.markAllAsTouched();
      return;
    }

    const months = Number(this.filterForm.value.months);
    this.loading = true;
    this.hasLoaded = false;

    forkJoin({
      dormant: this.farmerService.getDormantFarmers(months),
      active: this.farmerService.getActiveFarmerStats(months),
      top: this.farmerService.getTopFarmers(months),
      bottom: this.farmerService.getBottomFarmers(months)
    }).subscribe({
      next: (result) => {
        this.setAnalyticsData(result.dormant, result.active, result.top, result.bottom);
        this.loading = false;
        this.hasLoaded = true;
      },
      error: (error) => {
        console.error('Error fetching farmer analytics:', error);
        this.loading = false;
        this.snackbar.showNotification('error', 'Failed to fetch farmer analytics');
      }
    });
  }

  private setAnalyticsData(
    dormant: { entity: FarmerAnalyticsResponse },
    active: { entity: FarmerAnalyticsResponse },
    top: { entity: FarmerAnalyticsResponse },
    bottom: { entity: FarmerAnalyticsResponse }
  ): void {
    this.dormantCount = dormant.entity.count;
    this.activeCount = active.entity.count;
    this.topCount = top.entity.count;
    this.bottomCount = bottom.entity.count;
    this.dormantFarmers = dormant.entity.farmers || [];
    this.activeFarmers = active.entity.farmers || [];
    this.topFarmers = top.entity.farmers || [];
    this.bottomFarmers = bottom.entity.farmers || [];

    this.dormantDataSource = new MatTableDataSource(this.dormantFarmers);
    this.activeDataSource = new MatTableDataSource(this.activeFarmers);
    this.topChartOptions = this.createRankingChart(this.topFarmers, '#1976d2');
    this.bottomChartOptions = this.createRankingChart(this.bottomFarmers, '#607d8b');

    setTimeout(() => this.attachPaginators());
  }

  applyTableFilter(dataSource: MatTableDataSource<FarmerAnalyticsRow>, event: Event): void {
    dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  private attachPaginators(): void {
    this.dormantDataSource.paginator = this.dormantPaginator;
    this.activeDataSource.paginator = this.activePaginator;
  }

  private createRankingChart(farmers: FarmerAnalyticsRow[], color: string): Partial<FarmerRankingChartOptions> {
    return {
      series: [{
        name: 'Milk quantity',
        data: farmers.map((farmer) => Number(farmer.totalQuantity) || 0)
      }],
      chart: {
        type: 'bar',
        height: Math.max(220, Math.min(420, farmers.length * 52 + 80)),
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '48%',
          distributed: false,
          dataLabels: { position: 'top' }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (value: number) => `${value.toFixed(1)} kg`,
        offsetX: 22,
        style: { colors: [color], fontSize: '11px', fontWeight: 600 }
      },
      xaxis: {
        categories: farmers.map((farmer) => farmer.username),
        labels: { formatter: (value: string) => `${Number(value).toFixed(0)} kg` }
      },
      tooltip: {
        y: { formatter: (value: number) => `${value.toFixed(1)} kg` }
      }
    };
  }
}
