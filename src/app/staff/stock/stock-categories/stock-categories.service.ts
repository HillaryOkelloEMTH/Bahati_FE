import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockCategoriesService {

  constructor(private http: HttpClient) { }

  getCategoryDetails(CategoryId): Observable<any> {
    const getCategoryDetailsUrl = `${environment.apiUrl}/api/v1/product-categories/${CategoryId}`;
    return this.http.get<any>(getCategoryDetailsUrl)
  }

  activateCategory(CategoryId): Observable<any> {
    const activateCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/activate-Category/${CategoryId}`;
    return this.http.put<any>(activateCategoryUrl, {})
  }

  getAllActiveCategories(): Observable<any> {
    const getAllActiveCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/find-active-categories`;
    return this.http.get<any>(getAllActiveCategoryUrl, {})
  }

  getAllCategories(): Observable<any> {
    const getAllCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/find-all-categories`;
    return this.http.get<any>(getAllCategoryUrl)
  }

  createCategory(data: any): Observable<any> {
    const createCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/add-category`;
    return this.http.post<any>(createCategoryUrl, data)
  }

  deactivateCategory(id: any): Observable<any> {
    const deactivateCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/deactivate-category/${id}`;
    return this.http.put<any>(deactivateCategoryUrl, {})
  }

  getAllinactiveCategory(CategoryId): Observable<any> {
    const getAllinactiveCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/find-inactive-categories`;
    return this.http.put<any>(getAllinactiveCategoryUrl, {})
  }

  updateCategory(Category): Observable<any> {
    const getAllinactiveCategoryUrl = `${environment.apiUrl}/api/v1/product-categories/update-category`;
    return this.http.put<any>(getAllinactiveCategoryUrl, Category)
  }
}
