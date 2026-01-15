# QR Code Dashboard

A React-based QR Code management dashboard for Split Lease house manuals. This component allows property managers to create, edit, preview, and print QR codes for guest reference.

## Features

- **QR Code Grid Display**: Responsive 4-column grid showing all QR codes
- **Create/Edit QR Codes**: Form with use case selection and live preview
- **Multiple Selection**: Select multiple QR codes for batch operations
- **Print Preview**: Preview selected QR codes before printing
- **Print Functionality**: Browser-native print dialog integration
- **Toast Notifications**: Success, error, warning, and info messages
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- React 18
- TypeScript
- Vite
- qrcode.react (QR code generation)
- react-to-print (Print functionality)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── QRCodeDashboard.tsx   # Main dashboard component
│   ├── QRCodeGrid.tsx        # Grid display of QR codes
│   ├── QRCodeForm.tsx        # Create/Edit form
│   ├── PrintPreview.tsx      # Print preview component
│   └── Toast.tsx             # Toast notification
├── styles/
│   ├── index.css             # Global styles
│   ├── QRCodeDashboard.css   # Dashboard styles
│   ├── QRCodeGrid.css        # Grid styles
│   ├── QRCodeForm.css        # Form styles
│   ├── PrintPreview.css      # Print styles
│   └── Toast.css             # Toast styles
├── types/
│   └── qrcode.types.ts       # TypeScript types
├── App.tsx                   # App entry point
└── main.tsx                  # React entry point
```

## Use Cases

The dashboard supports the following QR code use cases:

1. WiFi Connection
2. House Rules
3. Emergency Info
4. Check-in Instructions
5. Local Recommendations
6. Appliance Guide
7. Parking Instructions
8. Checkout Checklist

## License

Proprietary - Split Lease
