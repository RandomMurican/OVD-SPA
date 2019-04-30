import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})
export class VmComponent implements OnInit {
  link = '';

  loadTime = new Date().toLocaleTimeString();
  constructor(private route: ActivatedRoute, private domService: DomSanitizer) { }

  ngOnInit() {
    this.link = this.setLink(this.route.snapshot.paramMap.get('id'));
    this.setFocus();
  // window.addEventListener('load', initTime());
  }

setLink(protocol: string) {
  switch (protocol) {
    case 'rdp': {
      console.log('rdp');
      // document.getElementById('frame').url = 'http://10.100.70.230:9091/guacamole-example-1.0.0/';
      break;
    }
    default: {
      console.log('other');
      return 'https://i.ytimg.com/vi/ne2tliU4C2k/maxresdefault.jpg';
    }
  }
}

setFocus() {
  window.addEventListener('load', function () {
    window.focus();
    document.body.addEventListener('click', function(e) {
        window.focus();
    }, false);
  });
}

initTime() {
  this.loadTime = new Date().toLocaleTimeString();
}
}
