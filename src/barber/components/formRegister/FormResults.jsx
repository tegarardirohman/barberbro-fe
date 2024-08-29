import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Checkbox } from "@nextui-org/react";
import { FaPaperclip } from "react-icons/fa6";

export default function FormResults({ data }) {
  const { barbershop, services, operational_hours, social_media } = data;

  return (
    <div className="px-8 py-8">
      <div className="mt-1 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Barbershop Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {barbershop.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {barbershop.email}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {" "}
              {barbershop.contact_number}{" "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {" "}
              {barbershop.street_address}{" "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              City
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {" "}
              {barbershop.city}{" "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              State / Province / Region
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {" "}
              {barbershop.state_province_region}{" "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Zip Code
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {" "}
              {barbershop.postal_zip_code}{" "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Opening Hours
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>DAY</TableColumn>
                    <TableColumn>OPEN</TableColumn>
                    <TableColumn>CLOSED</TableColumn>
                </TableHeader>
                <TableBody>

                    {operational_hours.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.day}</TableCell>
                            <TableCell>{item.opening_time}</TableCell>
                            <TableCell>{item.closing_time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            </dd>
          </div>


          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Services
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>SERVICE NAME</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                </TableHeader>
                <TableBody>

                    {services.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.service_name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Social Media
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">

            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>PLATFORM</TableColumn>
                    <TableColumn>URL</TableColumn>
                </TableHeader>
                <TableBody>

                    {social_media.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.platform_name}</TableCell>
                            <TableCell>{item.platform_url || "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            </dd>
          </div>



        </dl>
      </div>
    </div>
  );
}
