import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleBasedAccessDirective } from '../../shared/directive/role-based-access.directive';
import { AuthService } from '../../shared/service/auth.service';
import { ParticipantService } from '../../shared/service/participant.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RoleBasedAccessDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();
  id: string = sessionStorage.getItem('participantId')!;

  generalMenu = [
    {
      name: 'Home',
      routerLink: ""
    },
    {
      name: 'Participants Data',
      routerLink: "/participants"
    },
    {
      name: 'Capability',
      routerLink: "/capability"
    },
    {
      name: 'COT',
      routerLink: "/cot"
    },
  ];

  generalUserMenu = [
    {
      name: 'Home',
      routerLink: ""
    },
    {
      name: 'Profil',
      routerLink: `/participants/${this.id}/detail`
    },
    {
      name: 'Capability',
      routerLink: "/capability"
    },
    {
      name: 'COT',
      routerLink: "/cot"
    },
  ];

  optionalMenu = [
    {
      name: 'Users',
      routerLink: "/users"
    },
    {
      name: 'E-Sign',
      routerLink: "/e-sign"
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isMenuVisible'] && changes['isMenuVisible'].currentValue === true) {
      // Ambil ID ketika sidebar muncul
      this.id = sessionStorage.getItem('participantId')!;
      // Update `generalUserMenu` jika perlu
      this.generalUserMenu = [
        {
          name: 'Home',
          routerLink: ""
        },
        {
          name: 'Profil',
          routerLink: `/participants/${this.id}/detail`
        },
        {
          name: 'Capability',
          routerLink: "/capability"
        },
        {
          name: 'COT',
          routerLink: "/cot"
        },
      ];
    }
  }

  closeMenu() {
    this.isMenuVisible = false;
    this.menuClose.emit();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.clear(); // Clear all sessionStorage items
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.router.navigateByUrl('/login');
        sessionStorage.clear();
      }
    });
  }
}
