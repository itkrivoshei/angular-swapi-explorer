import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { CharacterDetailsComponent } from "./character-details.component";

describe("CharacterDetailsComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterDetailsComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  it("should create", () => {
    const fixture = TestBed.createComponent(CharacterDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
