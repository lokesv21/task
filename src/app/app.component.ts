import { Component, OnInit, DoCheck } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import data from "./data/data";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "task";
  sortDir = -1;
  sorted: string = "name";
  cookies: any[] = [{ name: "", price: "", category: "" }];
  headers: Array<{ label: string; key: string }> = [
    {
      label: "Produce Name",
      key: "name"
    },
    {
      label: "Price",
      key: "price"
    },
    {
      label: "Category",
      key: "category"
    }
  ];
  constructor(private _http: HttpClient) {}
  ngOnInit(): void {
    this.cookies = data;
  }

  onSortClick(event: any, col: string) {
    this.sorted = col;
    let target = event.currentTarget,
      classList = target.classList;
    classList.remove("off");
    if (classList.contains("up")) {
      classList.remove("up");
      classList.add("down");
      this.sortDir = -1;
    } else {
      classList.add("up");
      classList.remove("down");
      this.sortDir = 1;
    }
    this.sortArr(col);
  }

  sortArr(colName: string) {
    this.cookies.sort((a: any, b: any) => {
      const a1 = a[colName].toLowerCase();
      const b1 = b[colName].toLowerCase();
      return a1.localeCompare(b1) * this.sortDir;
    });
  }
}
