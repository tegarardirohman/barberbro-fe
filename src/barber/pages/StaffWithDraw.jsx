import { Button, Card, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import BankCards from '../components/withdraw/BankCards'
import { PiHandWithdrawFill, PiHandWithdrawLight } from 'react-icons/pi'
import { FaChevronCircleDown } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { convertLongToDate, rupiah } from '../../utils/utils'
import { toast } from 'react-toastify'
import useAxios from '../../hooks/useAxios'
import { MdOutlinePendingActions } from 'react-icons/md'

const StaffWithDraw = () => {
    const [userData, setUserData] = useState(null);
    const {user, userDetail, refreshUserDetail} = useAuth();

    // data
    const [bankData, setBankData] = useState([]);
    const [amount, setAmount] = useState(0);
    const [amountErr, setAmountErr] = useState("");


    useEffect(() => {

        if(userDetail) {
            setUserData(userDetail)
        } else {
            refreshUserDetail()
        }
    }, [userDetail])


    useEffect(() => {
        console.log(bankData)

    }, [bankData, amount])

    // amount
    const handleChangeAmount = (e) => {
        const value = e.target.value

        if (value < 0) {
            setAmountErr("Amount cannot be negative")
        }

        if (value > userData?.balance) {
            setAmountErr("Amount cannot be greater than balance")
        }

        setAmountErr("")
        setAmount(e.target.value)
    }

    const {request} = useAxios()

    //create withdraw
    const postWithdraw = async(formData) => {

        console.log(formData);

        try {
            const res = await request('/withdrawals', 'POST', formData)

            if (res.statusCode === 201) {
                toast.success("Withdrawal success")
                setAmount(0)
                setBankData([])
                fetchHistory();
            }

            console.log(res)

        } catch (error) {
            console.log(error)
        }
    }

    // submit
    const handleSubmit = () => {


        const regex = /^[A-Za-z`.\s-]+$/;

        if (bankData.bank === "") {
            toast.error("Please select a bank");
            return;
        } else if (bankData.number.toString().length < 3) {
            toast.error("Please enter a valid account number");
            return;
        } else if (!regex.test(bankData.name)) {
            toast.error("Please enter a valid bank name");
            return;
        } else if (amount < 10000 || amount > userData?.balance) {
            toast.error("Please enter a valid amount");
            return;
        }

        console.log(bankData.name)

        const formData = {
            // id: "",
            // status: "",
            account_number: bankData?.number,
            account_name: bankData?.name,
            bank_name: bankData?.bank,
            withdrawal_amount: amount,
        }

        postWithdraw(formData);
    }



    // withdrawal history
    const [history, setHistory] = useState([])

    const fetchHistory = async() => {
        try {
            const res = await request('/withdrawals/current', 'GET')
            console.log("history", res)

            // sorting based on created_at
            const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

            setHistory(sorted)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])

  return (
    <div className='flex gap-6 px-8 py-4 w-full'>

        {/* right */}
        <Card className='w-1/2 p-4'>
        <h2 className='text-xl font-bold'>Withdraw</h2>

        <div className="flex w-full gap-8">

            <Card shadow='none' className='w-full px-4 py-4 border-1 mt-4'>

                <Card className='px-8 py-8 border-1 bg-gold mb-7 relative' shadow='none'>
                    <h2 className='font-light'>Balance</h2>
                    <p className='text-3xl font-bold w-full text-center'>{ rupiah(userData?.balance) }</p>
                </Card>

                <BankCards setBankData={setBankData} />

                <div className="w-full px-4">
                    <Input
                        bordered
                        label="Enter Amount"
                        type="number"
                        placeholder="Amount"
                        labelPlacement='outside'
                        labelPlaceholder="Amount"
                        className='w-full mt-8'
                        max={userData?.balance}
                        onChange={handleChangeAmount}
                        isInvalid={amountErr}
                        errorMessage={amountErr}
                    />
                </div>


                <p className='text-sm pt-20 pr-8'>Ready to claim your earnings? Click the button below to withdraw your funds.</p>

                <Button onPress={handleSubmit} className='w-full mt-4 bg-slate-800 text-slate-100' size='lg' color='default'>Withdraw</Button>


            </Card>

        </div>
            
        </Card>

            {/* Account */}
        <Card className='w-1/2 p-4'>
            <h2 className='text-xl font-bold mb-4'>History</h2>

            {
                history && history?.length === 0 ? (
                    <Card className='w-full p-4 border-1 mb-2' shadow='sm'>
                        <p className='text-slate-800 font-semibold text-center'>No Withdraw History</p>
                    </Card>
                ) : null
            }


            {
                history && history?.map((item, index) => (
                    
                    <Card key={index} shadow='none' className='w-full p-4 border-1 mb-2 flex flex-row justify-between items-center'>
                    <div className='flex flex-row gap-4'>

                            {
                                item?.status === "PENDING" ? (
                                    <MdOutlinePendingActions size={28} className='w-12 h-12 bg-yellow-300 rounded-lg p-4'/>
                                ) : (
                                    <FaChevronCircleDown size={28} className='w-12 h-12 bg-green-300 rounded-lg p-4'/>
                                )
                            }
                            
                            <div>
                                <p className='text-slate-800 font-bold'>Withdraw From balance</p>
                                <p className='text-slate-800 font-light text-sm'> { convertLongToDate(item?.created_at) } </p>
                            </div>
                    </div>
                    <p className='text-red-600 font-semibold'> { rupiah(item?.withdrawal_amount) } </p>
                    </Card>
                ))
            }
            


        </Card>

    </div>
  )
}

export default StaffWithDraw