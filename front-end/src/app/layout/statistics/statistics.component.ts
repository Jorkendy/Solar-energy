import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DashboardService} from "../dashboard/dashboard.service";
import {FormControl} from "@angular/forms";
import data from '../../mock-data/mock-data';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'voltage', 'power'];
  displayedColumns2: string[] = ['id', 'date', 'temperature'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  month: FormControl;
  station: FormControl;
  listItems: any[];

  constructor(
      private service: DashboardService,
      private route: ActivatedRoute
  ) {
    this.month = new FormControl(5);
    this.station = new FormControl(data[0].uuid);
  }

  ngOnInit() {
    this.subscribeParams();
    this.getData();
  }

  subscribeParams() {
    this.route.params.subscribe(params => {
      if (params.uuid) {
        this.station.setValue(params.uuid);
      }
    })
  }

  getData() {
    this.service.get(this.station.value).subscribe(data => {
      this.listItems = data.statistics;
      console.log(this.listItems);
      this.listItems.map(item => {
        item.data.map(_item => {
          _item.power = (Math.pow(_item.voltage, 2)/11800).toFixed(2);
          return _item;
        });
        return item;
      });
      this.dataSource = new MatTableDataSource(this.listItems.find(item => +item.month === +this.month.value).data.map((item, index) => {
        item.id = index + 1;
        return item;
      }));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.subscribeMonthSelect();
      this.subscribeStationSelect();
    })
  }

  subscribeMonthSelect() {
    this.month.valueChanges.subscribe(data => {
      this.dataSource = new MatTableDataSource(this.listItems.find(item => +item.month === +data).data.map((item, index) => {
        item.id = index + 1;
        return item;
      }));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  subscribeStationSelect() {
    this.station.valueChanges.subscribe(data => {
      this.getData();
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
