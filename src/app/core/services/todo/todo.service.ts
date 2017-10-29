import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Page, Todo } from '../../../models';

/**
 * Service
 */
@Injectable()
export class TodoService {
  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Find all
   * @param offset
   * @param limit
   */
  findAll(offset?: number, limit?: number): Observable<Page<Todo>> {
    const url = `/todos`;
    return this.http.get<Page<Todo>>(url);
  }

  /**
   * Find
   * @param id
   */
  find(id: number): Observable<Todo> {
    const url = `/todos/${id}`;
    return this.http.get<Todo>(url);
  }

  /**
   * Create
   * @param todo
   */
  create(todo: Todo): Observable<Todo> {
    const url = `/todos`;
    return this.http.post<Todo>(url, todo);
  }

  /**
   * Update
   * @param todo
   */
  update(todo: Todo): Observable<Todo> {
    const url = `/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  /**
   * Delete
   * @param todo
   */
  delete(id: number): Observable<Todo>  {
    const url = `/todos/${id}`;
    return this.http.delete<Todo>(url);
  }

}
