import {
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { environment } from '@env/environment';
import { saveAs } from 'file-saver';

export const regexValidator = (
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | any => {
    if (!control.value) {
      return null;
    }

    const valid = regex.test(control.value);

    return valid ? null : error;
  };
};

export const sortAndMapTableData = (
  tableData: any[],
  sortingOrder: 'asc' | 'desc',
  propertyToSortBy: string,
  allDateProperties?: any[]
): any[] => {
  const modifiedData: any[] = [];

  tableData?.forEach((dataEl: any) => {
    let modifiedDataEl = {
      ...dataEl,
    };

    allDateProperties?.forEach((dateProp: any) => {
      modifiedDataEl = {
        ...modifiedDataEl,

        [dateProp]: new Date(
          dataEl[dateProp] ? dataEl[dateProp] + 'Z' : dataEl[dateProp]
        ).getTime(),
      };
    });

    modifiedData.push(modifiedDataEl);
  });

  const sortedData = modifiedData.slice().sort((a, b) => {
    const dateA = new Date(a[propertyToSortBy]).getTime();
    const dateB = new Date(b[propertyToSortBy]).getTime();

    let result: any;

    if (sortingOrder === 'asc') {
      result = dateA - dateB;
    } else if (sortingOrder === 'desc') {
      result = dateB - dateA;
    }

    return result;
  });

  return sortedData;
};

export const validateFileType = (files: FileList | File[], types: string[]) => {
  return Array.from(files).every((file: any) => {
    return types.includes(file.type);
  });
};

export const isControlDuplicateInFormArrayValidator = (
  formArray: FormArray,
  formControlName: string,
  error: ValidationErrors
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const array = formArray.controls.map((controlEl) => {
      return controlEl.value[formControlName];
    });

    const isControlADuplicate = array.some((el, index) => {
      if (el === control.value) {
        return array.indexOf(el) !== index;
      }
    });

    if (isControlADuplicate) {
      control.get(formControlName)?.markAsTouched();
    }

    return isControlADuplicate === true ? error : null;
  };
};

export const convertToFormData = (data: any) => {
  const formData = new FormData();

  if (data) {
    const keys = Object.keys(data);

    keys.forEach((key: string) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((el: any) => {
          formData.append(key, el);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
  }

  return formData;
};

const isEmptyString = (dateString: any) => {
  return /^\s*$/.test(dateString);
};

export const convertDateToDateTimeString = (dateString: any) => {
  if (!isEmptyString(dateString)) {
    const date = new Date(dateString);

    const options: any = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
      date
    );

    // Extracting individual components for further customization
    const [month, day, year, time] = formattedDate.split(' ');

    // Customizing the output format
    const formattedString = `${month} ${day} ${year} ${time}`;

    return formattedString;
  } else return '';
};

export const exportToCSV = (data: any[], filename: string) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, filename);
};

const convertToCSV = (data: any[]): string => {
  const header = Object.keys(data[0])
    .map((str: string) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(',');
  const csv = data.map((row) => extractRowValues(row)).join('\n');
  return `${header}\n${csv}`;
};

const extractRowValues = (row: any): string => {
  const rowValues: any = [];
  Object.values(row).forEach((value: any) => {
    if (typeof value === 'object') {
      // Assuming you want to extract the 'name' property if it exists
      rowValues.push(value?.name ? value?.name : '');
    } else {
      rowValues.push(value);
    }
  });
  return rowValues.join(',');
};

export const exportIndivdualToExcel = (
  surveyId: string,
  respondent: string
) => {
  const url =
    environment.api_url +
    `/surveyresponse/export/xlsx/${respondent}/${surveyId}`;

  window.open(url, '_blank');
};

export const exportSummaryToCSV = (surveyId: string) => {
  const url = environment.api_url + `/surveyresponse/export/csv/${surveyId}`;

  window.open(url, '_blank');
};

export const exportSummaryToExcel = (surveyId: string) => {
  const url = environment.api_url + `/surveyresponse/export/xlsx/${surveyId}`;

  window.open(url, '_blank');
};
