import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit {

  loadTime = new Date().toLocaleTimeString();
  constructor() { }

  ngOnInit() {
    window.addEventListener('load', function () {
      window.focus();
      document.body.addEventListener('click', function(e) {
          window.focus();
      }, false);
  });
   window.addEventListener('load', initTime());
  }

  initTime() {
    this.loadTime = new Date().toLocaleTimeString();
  }
}
