import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Entry } from '../models/entry.model';
import { AuthenticatedUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly api = 'http://localhost:3000/articles';
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.api).pipe(
      map(entries => entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())),
      catchError(err => this.processError(err, 'Failed to fetch entries'))
    );
  }

  fetchOne(id: string): Observable<Entry | null> {
    return this.http.get<Entry>(`${this.api}/${id}`).pipe(
      catchError(() => throwError(() => new Error('Entry not found')))
    );
  }

  persist(data: { title: string; content: string }, user: AuthenticatedUser, id?: string): Observable<Entry> {
    if (id) {
      return this.fetchOne(id).pipe(
        switchMap(existing => {
          if (existing?.authorId !== user.id) return throwError(() => new Error('Unauthorized edit'));
          return this.http.put<Entry>(`${this.api}/${id}`, { ...existing, ...data });
        })
      );
    }

    const newEntry: Entry = {
      id: Math.random().toString(36).substring(2, 11),
      title: data.title,
      content: data.content,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString()
    };

    return this.http.post<Entry>(this.api, newEntry);
  }

  remove(id: string, user: AuthenticatedUser): Observable<any> {
    return this.fetchOne(id).pipe(
      switchMap(existing => {
        if (existing?.authorId !== user.id) return throwError(() => new Error('Unauthorized delete'));
        return this.http.delete(`${this.api}/${id}`);
      })
    );
  }

  private processError(error: any, fallback: string): Observable<never> {
    return throwError(() => new Error(error instanceof Error ? error.message : fallback));
  }
}
