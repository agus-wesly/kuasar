## KUASAR WEB

Demo link : https://kuasar-psi.vercel.app

## Library & Dependencies

- Build tools -> Vite + React : https://vitejs.dev/
- Language -> Typescript : https://www.typescriptlang.org/
- CSS -> Tailwind.css : https://tailwindcss.com/
- Components -> Shadcn UI (Radix UI) : https://ui.shadcn.com/ | https://www.radix-ui.com/primitives
- Form Library -> React Hook Form : https://react-hook-form.com/
- Validation -> Zod : https://zod.dev/
- Routing -> React router dom : https://reactrouter.com/en/main/start/overview
- State manager -> Zustand : https://zustand-demo.pmnd.rs/
- Async state manager (Handling data from API) -> Tanstack query : https://tanstack.com/query/latest/docs/framework/react/overview
- Animation -> Framer motion : https://www.framer.com/motion/
- Fetch -> Axios : https://axios-http.com/docs/intro

# Running the app

```
npm install
```

```
npm run build
```

```
npm run preview
```

## Adding IP for Cloud Run -> Static outbound IP address

[Link](https://cloud.google.com/run/docs/configuring/static-outbound-ip#:~:text=To%20enable%20a%20Cloud%20Run%20service%20to%20route%20requests%20through,with%20the%20static%20IP%20address.)

```sh
a. Creating a subnetwork

    1. gcloud compute networks list

    2. gcloud compute networks subnets create subnet-kuasar --range=10.122.0.0/28 --network=default --region=asia-southeast1

b. Creating a Serverless VPC Access connector

    1. gcloud compute networks vpc-access connectors create connector-kuasar --region=asia-southeast1 --subnet-project=kuasarstorage --subnet=subnet-kuasar

c. Configuring network address translation (NAT)

    1. gcloud compute routers create router-kuasar --network=default --region=asia-southeast1

    2. gcloud compute addresses create kuasar-ip --region=asia-southeast1

    3. gcloud compute routers nats create nat-kuasar --router=router-kuasar --region=asia-southeast1 --nat-custom-subnet-ip-ranges=subnet-kuasar --nat-external-ip-pool=kuasar-ip

d. Routing Cloud Run traffic through the VPC network

    1. gcloud run deploy kuasar-frontend --image=IMAGE_URL --vpc-connector=connector-kuasar --vpc-egress=all-traffic
```
