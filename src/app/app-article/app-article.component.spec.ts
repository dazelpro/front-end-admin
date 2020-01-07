import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppArticleComponent } from './app-article.component';

describe('AppArticleComponent', () => {
  let component: AppArticleComponent;
  let fixture: ComponentFixture<AppArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
