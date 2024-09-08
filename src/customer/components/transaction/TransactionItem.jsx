import { Card, CardHeader, CardBody, Chip, TableHeader, TableColumn, TableBody, TableRow, TableCell, Table, CardFooter, Button } from '@nextui-org/react'
import React from 'react'
import { convertLongToDate, getImageUrl, rupiah } from '../../../utils/utils'
import { Link } from 'react-router-dom'

const TransactionItem = ({ data, handleDetails }) => {

    const getStatus = (status) => {
        switch(status.toLowerCase()) {
            case "pending":
                return <Chip color="warning"> Pending </Chip>
            case "settlement":
                return <Chip color="primary"> Settlement </Chip>
            case "canceled":
                return <Chip color="danger"> Cancelled </Chip>
            case "completed":
                return <Chip color="success"> Completed </Chip>
            default:
                return <Chip color="secondary"> {status} </Chip>
        }
    }

    if (!data || data.length === 0) {
        return <div className='text-center font-bold text-2xl'>No transactions available</div>;
    }

  return (
    
    <>
        {data.map((item, index) => (

            <Card key={index} className='p-4 mb-6 flex flex-row border-1 hover:shadow-lg transition-shadow hover:scale-105' shadow='none' radius='lg' isPressable onPress={() => handleDetails(item)}>

                
                <Link to={"/barbershop/" + item.barber.id} className='h-full w-1/4 aspect-square bg-red-300 rounded-md'>
                    <img src={getImageUrl(item.barber.barbershop_profile_picture_id.path)} alt={item.barber.name} className='rounded-md h-full object-cover' />
                </Link>

                <div className='flex-1'>
                <CardHeader className='border-b-1'>
                    <h2 className="font-bold w-full py-2 ml-4"> { item.barber.name } </h2>
                    
                    { getStatus(item.status) }
                </CardHeader>
                <CardBody className='flex flex-row gap-8 justify-between'>

                <div className='text-sm flex flex-col ml-4 w-1/3'>
                        <h3 className='font-bold pb-2'>Booking: </h3>
                        <table className='border-spacing-y-2'>
                            <tbody className='border-spacing-y-2'>
                                <tr>
                                    <td className='font-medium'>Id</td>
                                    <td className='pl-4'> { item.booking_id } </td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Name</td>
                                    <td className='pl-4'> { item.customer.firstName + " " + item.customer.surname } </td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Date</td>
                                    <td className='pl-4'> { convertLongToDate(item.booking_date) } </td>
                                </tr>
                                <tr>
                                    <td className='font-medium'>Time</td>
                                    <td className='pl-4'> { item.booking_time } </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                <div className='flex-1'>
                        {/* <h3 className='font-bold pb-2'>Service: </h3> */}
                        <Table aria-label="Example static collection table" shadow='none' className='w-full' >
                        <TableHeader>
                            <TableColumn>Service</TableColumn>
                            <TableColumn>Price</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {
                                item.services.map((service, index) => (
                                    <TableRow key={index}>
                                    <TableCell> { service.service_name } </TableCell>
                                    <TableCell> { rupiah(service.price) } </TableCell>
                                    </TableRow>
                                ))
                            }
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell className='font-bold'> {rupiah(item.total_price)} </TableCell>
                            </TableRow>

                        </TableBody>
                        </Table>

                    </div>

                </CardBody>

                </div>

            </Card>
        ))}
            
    </>

  )
}

export default TransactionItem