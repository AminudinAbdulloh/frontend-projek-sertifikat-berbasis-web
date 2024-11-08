import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SearchComponent,
    SidebarComponent,
    CommonModule,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuVisible: boolean = false;
  shouldShowHeader = true;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onMenuClose() {
    this.isMenuVisible = false;
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.shouldShowHeader = !(
        currentRoute === '/login' ||
        currentRoute === '/register' ||
        currentRoute === '/reset-password' ||
        currentRoute === '/passwordreset' ||
        currentRoute.includes('/reset') ||
        (currentRoute.includes('/users') && currentRoute.includes('/edit')) ||
        (currentRoute.includes('/users') && currentRoute.includes('/add')) ||
        currentRoute === '/not-found'
      );
    });
  }
}
