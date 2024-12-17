import {
  ApexAxisChartSeries,
  ApexXAxis,
  ApexChart,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis,
  ApexOptions,
  ApexLegend,
  ApexPlotOptions,
  ApexGrid,
  ApexResponsive,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';

export const Filters = [
  'All Time',
  'Today',
  'Last 7days',
  'This Month',
  'This Year',
  'Custom range',
];

export enum FiltersEnum {
  ALL_TIME = 'All Time',
  TODAY = 'Today',
  LAST_SEVEN_DAYS = 'Last 7days',
  THIS_MONTH = 'This Month',
  THIS_YEAR = 'This Year',
  CUSTOM_RANGE = 'Custom range',
}
export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  options: ApexOptions;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  grid: ApexGrid;
  colors: string[];
  responsive: ApexResponsive[];
  labels: any;
};

export interface Plot {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  categories?: string[];
  colors?: string[];
  labels?: string[];
}

export interface FilterDTO {
  startDate: string;
  endDate: string;
  environmentVariableType: number;
  appId: number;
}

export interface PiChartDTO {
  series: number[];
  labels: string[];
  colors: string[];
}

export interface LineChartDTO {
  series: [
    {
      name: string;
      data: number[];
      color: string;
    }
  ];
  categories: string[];
}

export interface ColumnChartDTO {
  series: [
    {
      name: string;
      data: number[];
    }
  ];
  colors: string[];
  categories: string[];
}

export interface Dashboard {
  allSurveysCount: number;
  collabSurveys: CollaboratedSurvey[];
  onGoingSurveysCount: number;
  upComingSurveysCount: number;
  collabSurveysCount: number;
}

export interface CollaboratedSurvey {
  createdAt: string;
  email: string;
  fullname: string;
  permission: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
