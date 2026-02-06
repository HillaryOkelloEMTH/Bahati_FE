import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  
  getRoleDetails(roleId): Observable<any>{
    const getRoleDetailsUrl = `${environment.apiUrl}/admin/api/v1/roles/${roleId}`;

    return this.http.get<any>(getRoleDetailsUrl)
  }

  fetchAllAccessRights(): Observable<any>{
    const fetchAllAccessRightsUrl = `${environment.apiUrl}/admin/api/v1/roles/access-rights`;

    return this.http.get<any>(fetchAllAccessRightsUrl)
  }

  activateRole(roleId): Observable<any>{
    const activateRoleUrl = `${environment.apiUrl}/admin/api/v1/roles/activate-role/${roleId}`;

    return this.http.put<any>(activateRoleUrl, {})
  }

  getAllActiveRoles(): Observable<any>{
    const getAllActiveRolesUrl = `${environment.apiUrl}/admin/api/v1/roles/active-roles`;

    return this.http.get<any>(getAllActiveRolesUrl, {})
  }

  getAllRoles(): Observable<any>{
    const getAllRolesUrl = `${environment.apiUrl}/admin/api/v1/roles/all-roles`;

    return this.http.get<any>(getAllRolesUrl)
  }

  createRole(role): Observable<any>{
    const createRoleUrl = `${environment.apiUrl}/admin/api/v1/roles/create-role`;

    return this.http.post<any>(createRoleUrl, role)
  }

  deactivateRole(roleId): Observable<any>{
    const deactivateRoleUrl = `${environment.apiUrl}/admin/api/v1/roles/deactivate-role/${roleId}`;

    return this.http.put<any>(deactivateRoleUrl, {})
  }

  getAllinactiveRoles(roleId): Observable<any>{
    const getAllinactiveRolesUrl = `${environment.apiUrl}/admin/api/v1/roles/inactive-roles`;

    return this.http.put<any>(getAllinactiveRolesUrl, {})
  }

  updateRole(roleId, role): Observable<any>{
    const getAllinactiveRolesUrl = `${environment.apiUrl}/admin/api/v1/roles/update-role/${roleId}`;

    return this.http.put<any>(getAllinactiveRolesUrl, role)
  }
  
}
