import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser, NgStyle } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Menubar } from "primeng/menubar";
import { MenuItem } from "primeng/api";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { FieldsetModule } from "primeng/fieldset";
import { AvatarModule } from "primeng/avatar";
import { PrimeIcons } from "primeng/api";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from "primeng/floatlabel";
import emailjs from "emailjs-com";
import { emailConfig } from "./email.config";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
  imports: [
    MatCardModule,
    MatSnackBarModule,
    Menubar,
    CardModule,
    ButtonModule,
    FieldsetModule,
    AvatarModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  isBrowser: boolean;
  items: MenuItem[] = [];
  contactForm!: FormGroup;
  imageProfile = "assets/j.png";

  constructor(
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.items = [
      {
        label: "About Me",
        icon: "pi pi-user",
        command: () => this.scrollToSection("aboutme"),
      },
      {
        label: "Projects",
        icon: "pi pi-briefcase",
        command: () => this.scrollToSection("projects"),
      },
      {
        label: "Work Experience",
        icon: "pi pi-id-card",
        command: () => this.scrollToSection("workexperience"),
      },
      {
        label: "Technical Skills",
        icon: "pi pi-star",
        command: () => this.scrollToSection("technicalskills"),
      },
      {
        label: "Contact Me",
        icon: "pi pi-envelope",
        command: () => this.scrollToSection("contactme"),
      },
    ];

    this.contactForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      message: new FormControl("", Validators.required),
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  phoneNumber = signal("+94754019752");
  linkedinUrl = signal("https://www.linkedin.com/in/janani-thavarajah-52987a1b2");
  githubUrl = signal("https://github.com/Jaanulittleluv");
  cvUrl = signal("https://drive.google.com/file/d/1nH4anfVt5A9vgJylFLxOC80KOxxyV0-G/view?usp=sharing");
  prj1URL = signal("https://github.com/Jaanulittleluv/HearCall");
  prj2URL = signal("https://github.com/Jaanulittleluv/FormApp-NodeJS-");
  prj3URL = signal("https://github.com/Jaanulittleluv/BookRates");
  prj4URL = signal("https://github.com/Jaanulittleluv/BookApp");
  prj5URL = signal("https://github.com/Jaanulittleluv/Cypress");
  prj6URL = signal("https://github.com/Jaanulittleluv/Selenium");
  prj7URL = signal("https://github.com/Jaanulittleluv/SpringBoot");
  prj8URL = signal("https://github.com/Jaanulittleluv/sql-employee-data-management");
  prj9URL = signal("https://github.com/Jaanulittleluv/Bear-Jump");

  async copyPhoneNumber() {
    try {
      const number = this.phoneNumber();
      await navigator.clipboard.writeText(number);
      this.snackBar.open("Number is copied", "Dismiss", {
        duration: 2000,
        horizontalPosition: "left",
        verticalPosition: "bottom",
      });
    } catch (err) {
      console.error("Failed to copy phone number:", err);
      this.snackBar.open("Failed to copy number", "Dismiss", {
        duration: 2000,
      });
    }
  }

  copyEmailAddress() {
    const email = "janani99824@gmail.com";
    if (this.isBrowser && navigator.clipboard) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          this.snackBar.open("Email address copied to clipboard!", "Close", {
            duration: 3000,
            horizontalPosition: "left",
            verticalPosition: "bottom",
          });
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          this.snackBar.open("Failed to copy email address!", "Dismiss", {
            duration: 4000,
            horizontalPosition: "left",
            verticalPosition: "bottom",
          });
        });
    }
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      const { email, message } = this.contactForm.value;

      const serviceID = emailConfig.serviceId;
      const templateID = emailConfig.templateId;
      const publicKey = emailConfig.publicKey;

      const templateParams = {
        from_email: email,
        message: message,
      };

      try {
        const response = await emailjs.send(
          serviceID,
          templateID,
          templateParams,
          publicKey
        );
        console.log("SUCCESS!", response.status, response.text);
        this.snackBar.open(
          "Your message has been sent successfully!",
          "Dismiss",
          {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          }
        );
        this.contactForm.reset();
      } catch (error) {
        console.error("FAILED...", error);
        this.snackBar.open(
          "Failed to send your message. Please try again later.",
          "Dismiss",
          {
            duration: 4000,
            horizontalPosition: "center",
            verticalPosition: "bottom",
          }
        );
      }
    } else {
      this.snackBar.open("Please check the form for errors.", "Dismiss", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
    }
  }

  imagepath = signal("https://www.svgrepo.com/show/353396/angular-icon.svg");
  imagepath1 = signal("https://www.svgrepo.com/show/452092/react.svg");
  imagepath2 = signal("https://www.svgrepo.com/show/452091/python.svg");
  imagepath3 = signal("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DarBcrJVsDdTMLc7-eMRqG28YYDDeCvdkw&s");
  imagepath4 = signal("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-L9SzX9DNWbVPRs2aO6DcgGi2-TOHXNwIA&s");
  imagepath5 = signal("https://www.svgrepo.com/show/354380/spring-icon.svg");
  imagepath6 = signal("https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/file-json-color-green-icon.png");
  imagepath7 = signal("https://www.svgrepo.com/show/303293/bootstrap-4-logo.svg");
  imagepath8 = signal("https://www.svgrepo.com/show/354202/postman-icon.svg");
  imagepath18 = signal("https://www.svgrepo.com/show/452075/node-js.svg");
  imagepath9 = signal("https://www.svgrepo.com/show/303388/java-4-logo.svg");
  imagepath10 = signal("https://www.svgrepo.com/show/374144/typescript.svg");
  imagepath11 = signal("https://www.svgrepo.com/show/452228/html-5.svg");
  imagepath12 = signal("https://www.svgrepo.com/show/452185/css-3.svg");
  imagepath13 = signal("https://staging.svgrepo.com/show/353935/jira.svg");
  imagepath14 = signal("https://staging.svgrepo.com/show/353935/jira.svg");
  imagepath17 = signal("https://staging.svgrepo.com/show/331488/mongodb.svg");
  imagepath15 = signal("https://www.svgrepo.com/show/303251/mysql-logo.svg");
  imagepath16 = signal("https://www.svgrepo.com/show/303210/figma-1-logo.svg");
}