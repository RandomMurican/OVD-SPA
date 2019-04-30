import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.css']
})

export class VmComponent implements OnInit {
  protocol = '';
  url: SafeResourceUrl;
  loadTime = new Date().toLocaleTimeString();
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setFocus();
  // window.addEventListener('load', initTime());
  }

setLink() {
  this.protocol = this.route.snapshot.paramMap.get('id');
  switch (this.protocol) {
    case 'rdp': {
      console.log('rdp');
      return this.sanitizer.bypassSecurityTrustResourceUrl('http://10.100.70.230:9091/guacamole-example-1.0.0/');
    }
    default: {
      console.log('other');
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://i.ytimg.com/vi/ne2tliU4C2k/maxresdefault.jpg');
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
