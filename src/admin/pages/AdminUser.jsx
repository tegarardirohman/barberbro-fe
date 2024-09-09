import React, { useEffect, useState } from 'react';
import TableComponent from '../components/table/TableComponent';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useAxios from '../../hooks/useAxios';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card} from "@nextui-org/react";
import RowComponent from '../components/table/RowComponent';
import LittleStatItem from '../components/stat/LittleStatItem';
import { FaUsers } from 'react-icons/fa';

const AdminUser = () => {
  useDocumentTitle('Admin - User Data')

  const [data, setData] = useState([]);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selected, setSelected] = useState(null);

  const { response, error, loading, request } = useAxios();

  

  const fetchData = async () => {
    try {
      const res = await request('/customers');

      setData(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
      await request(`/customers/${id}`, 'DELETE');
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };


  // Convert date_of_birth to readable format
  const processedData = data.map(user => ({
    ...user,
    date_of_birth: new Date(user.date_of_birth * 1000).toLocaleDateString(),
    is_male: user.is_male ? 'Male' : 'Female',
  }));
  
  
  const columns = [
    { uid: 'id', name: '#', sortable: true },
    { uid: 'firstName', name: 'FName', sortable: true },
    { uid: 'surname', name: 'SurName', sortable: true },
    { uid: 'email', name: 'Email', sortable: true },
    { uid: 'phone', name: 'Phone', sortable: false },
    { uid: 'address', name: 'Address', sortable: false },
    { uid: 'about', name: 'About', sortable: false },
    { uid: 'is_male', name: 'Gender', sortable: false },
    { uid: 'date_of_birth', name: 'Birth', sortable: true },
    { uid: 'actions', name: 'Actions', sortable: false },
  ];
  
  const INITIAL_VISIBLE_COLUMNS = ['firstName', 'surname', 'email', 'phone', 'is_male', 'date_of_birth'];
  
  function handleView(selectedData) {
    onOpen();
    setSelected(selectedData);
    console.log(selected)
  }
  
  function handleEdit(id) {
    console.log(`Edit user with id ${id}`);
  }
  
  function handleDelete(id) {
    console.log(`Delete user with id ${id}`);
  }
  
  function handleAdd() {
    console.log('Add new user');
  }

  return (
    <div className="p-8">
       <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size='xl' className='py-4 px-8'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col"> Detail of {selected?.firstName} </ModalHeader>
              <ModalBody className="flex flex-col gap-0">

                <RowComponent name="Id" value={selected?.id} />
                <RowComponent name="First Name" value={selected?.firstName} />
                <RowComponent name="Last Name" value={selected?.surname} />
                <RowComponent name="Email" value={selected?.email} />
                <RowComponent name="Phone" value={selected?.phone} />
                <RowComponent name="Address" value={selected?.address} />
                <RowComponent name="About" value={selected?.about } />
                <RowComponent name="Gender" value={selected?.is_male} />
                <RowComponent name="Birth Date" value={selected?.date_of_birth} />


              </ModalBody>
              <ModalFooter>
                <Button color="" variant="flat" onPress={onClose} className='w-full bg-slate-900 text-white'>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      {/* <Card className='w-full flex flex-row gap-8 justify-between border-separate mb-6 py-6 px-8 border-y-1' shadow='sm'>
          <LittleStatItem icon={<FaUsers />} color="green" title="Total Users" value={data.length} />
          <LittleStatItem icon={<FaUsers />} color="green" title="Total Users" value={data.length} />
          <LittleStatItem icon={<FaUsers />} color="slate" title="Total Users" value={data.length} />
          <LittleStatItem icon={<FaUsers />} color="slate" title="Total Users" value={data.length} />
      </Card> */}

      <Card className='p-4'>

        <TableComponent
          data={processedData}
          columns={columns}
          INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
          onView={handleView}
          // onEdit={handleEdit}
          onDelete={handleDelete}
          // onAdd={handleAdd}
        />

      </Card>

    </div>
  );
}

export default AdminUser;
