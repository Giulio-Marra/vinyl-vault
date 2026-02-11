<div align="center">

# 🎵 Vinyl Vault

**Piattaforma e-commerce full-stack per musica in vinile**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.0-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 📖 Panoramica

**Vinyl Vault** è un full-stack E-commerce dedicato al mondo dei vinili.
All interno dello shop è possibile ricercare e acquistare i prodotti preferiti.

## 💼 Progetto Portfolio

Questo progetto è stato sviluppato come **portfolio personale** per dimostrare competenze nello sviluppo full-stack di applicazioni web moderne ed è la prima versione.

### Obiettivi del Progetto
-  Mostrare padronanza dello stack Spring Boot + React
-  Implementare un'architettura scalabile e manutenibile
-  Applicare best practices di sicurezza e performance
-  Creare un'interfaccia utente moderna e responsive
-  Integrare servizi di pagamento reali (Stripe)
-  Documentare il codice e l'architettura in modo professionale

### Competenze Dimostrate
- **Backend**: Java, Spring Boot, Spring Security, JPA/Hibernate, REST API
- **Frontend**: React, Redux, Material-UI, Bootstrap, Responsive Design
- **Database**: PostgreSQL, modellazione dati relazionali
- **Sicurezza**: JWT, autenticazione/autorizzazione, validazione dati
- **Integrazione**: Stripe Payment Gateway
- **Strumenti**: Maven, Vite, Git, OpenAPI/Swagger

## 🛠️ Stack Tecnologico

### Backend
- **Framework**: Spring Boot 4.0.0
- **Linguaggio**: Java 21
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Sicurezza**: Spring Security + JWT (jsonwebtoken 0.12.6)
- **Pagamenti**: Stripe Java SDK 31.3.0
- **Documentazione API**: SpringDoc OpenAPI 2.8.3
- **Build Tool**: Maven
- **Validazione**: Spring Boot Starter Validation

### Frontend Web
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Gestione Stato**: Redux Toolkit 2.11.2
- **Routing**: React Router DOM 7.11.0
- **UI Library**: Material-UI 7.3.7
- **CSS Framework**: Bootstrap 5.3.8 + React Bootstrap 2.10.10
- **Styling**: Emotion (CSS-in-JS)
- **Icone**: React Icons 5.5.0
- **Loading States**: React Spinners 0.17.0

---

## ✨ Funzionalità Principali

### 🛍️ Catalogo e Navigazione Prodotti

Esplora un vasto catalogo di vinili con un'interfaccia intuitiva e moderna. Sfoglia per genere, artista,  e scopri nuove gemme musicali.

<img src="https://github.com/user-attachments/assets/ad6782ac-322a-456c-bb8b-2a61c1494869" width="600" />

---

### 🔍 Ricerca e Filtri Avanzati

Sistema di ricerca potente con filtri personalizzabili per prezzo, genere, artista,  e disponibilità. Trova esattamente ciò che cerchi in pochi click.

<img src="https://github.com/user-attachments/assets/069899a6-145d-4807-ba3d-a3bf2a4629c7" width="600" />

---
<img src="https://github.com/user-attachments/assets/9962a5df-ba84-4dab-9028-e6ea7c13c9ed" width="600" />

---

### 📝 Dettaglio Prodotto

Pagine prodotto ricche di informazioni con immagini ad alta qualità, tracklist complete, descrizioni dettagliate e informazioni sulla disponibilità.

<img src="https://github.com/user-attachments/assets/6d264644-a397-4a71-8443-5b81d598ff2f" width="600" />

---

### 🛒 Gestione Carrello
### 💳 Processo di Checkout e Pagamento

Aggiungi i tuoi vinili preferiti al carrello, modifica quantità, rimuovi prodotti e visualizza il riepilogo in tempo reale con calcolo totale automatico.
Sistema di checkout sicuro e intuitivo con integrazione Stripe per pagamenti. Supporta carte di credito, debito e altri metodi di pagamento moderni con conferma immediata.

<img src="https://github.com/user-attachments/assets/ae15ac8d-ad87-490a-9b6a-0131b90435e8" width="600" />

---

### 🔐 Autenticazione e Registrazione

Sistema di autenticazione sicuro basato su JWT. Registrazione rapida, login, logout con validazione completa dei dati.

  <img src="https://github.com/user-attachments/assets/39612180-7cc2-4a2a-a07b-f0f8a0e13e3d" width="600" />
  
---

  <img src="https://github.com/user-attachments/assets/12d369fe-6c32-4fef-977f-bd7406e2502f" width="600" />

---


### 📦 Storico e Gestione Ordini

Consulta tutti i tuoi ordini passati con dettagli completi, stato spedizione e informazioni di pagamento.

<img src="https://github.com/user-attachments/assets/a19d9102-8cfe-48e9-9244-7ab4b07d811f" width="600" />

---

## 📚 Documentazione API

Il progetto include la documentazione completa dell'API in formato OpenAPI/Swagger. 

Per visualizzare la documentazione interattiva:
1. Scarica il file YAML della documentazione (swagger YAML) dalla repository
2. Vai su [Swagger Editor](https://editor.swagger.io/)
3. Trascina il file YAML nell'editor
4. Esplora tutti gli endpoint, modelli e schemi disponibili


La documentazione include:
- ✅ Tutti gli endpoint REST disponibili
- ✅ Schemi di richiesta e risposta
- ✅ Codici di stato HTTP
- ✅ Modelli di dati completi
- ✅ Esempi di utilizzo

---

## 🎯 Caratteristiche Tecniche

### Sicurezza
- ✅ Autenticazione basata su JWT
- ✅ Password criptate con BCrypt
- ✅ Protezione CSRF
- ✅ Validazione input lato server
- ✅ Gestione ruoli e permessi

### Performance
- ✅ Lazy loading componenti React
- ✅ Ottimizzazione query database
- ✅ Caching strategico
- ✅ Build ottimizzata con Vite
- ✅ Code splitting automatico

### Esperienza Utente
- ✅ Design responsive (mobile, tablet, desktop)
- ✅ Interfaccia moderna e intuitiva
- ✅ Loading states e feedback visivi
- ✅ Gestione errori user-friendly
- ✅ Navigazione fluida senza ricaricamenti

---

## 🚀 Funzionalità Aggiuntive in Sviluppo

- [ ] **Sistema di rating e recensioni vinili** - Possibilità per gli utenti di valutare e recensire i prodotti acquistati
- [ ] **Applicazione mobile Flutter** - Versione nativa per iOS e Android
- [ ] Lista dei desideri persistente
- [ ] Notifiche email automatiche
- [ ] Sistema di grading per condizione vinili (mint, near mint, VG+, ecc.)

---

## 📝 Licenza

Progetto sviluppato per scopi educativi e di portfolio.

</div>
