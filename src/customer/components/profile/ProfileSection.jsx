import { Button, Image, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { convertDateToLong } from "../../../utils/utils";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { FaAt } from "react-icons/fa";
import ProfileItem from "../../../barber/components/profile/ProfileItem";

export default function ProfileSection({ title = "Edit your profile info", handleEdit }) {
    useDocumentTitle('Barberbro - Profile')

    const { user } = useAuth();
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            id: "",
            firstName: "",
            surname: "",
            phone: "",
            address: "",
            // about: "",
            is_male: true, // Default value
            date_of_birth: new Date().toISOString().split('T')[0], // Default to current date in yyyy-MM-dd format
        },
    });

    const { response, error, loading, request } = useAxios();

    const fetchData = async () => {
        try {
            const res = await request('/customers/current');
            reset({
                id: res.data.id || "",
                firstName: res.data.firstName || "",
                surname: res.data.surname || "",
                phone: res.data.phone || "",
                address: res.data.address || "",
                // about: res.data.about || "",
                is_male: res.data.is_male !== undefined ? res.data.is_male : true, 
                date_of_birth: res.data.date_of_birth ? new Date(res.data.date_of_birth).toISOString().split('T')[0] : new Date().toISOString().split('T')[0], // Format to yyyy-MM-dd
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
           
            const formattedData = {
                ...data,
                is_male: (data.is_male === "true"),
                date_of_birth: convertDateToLong(data.date_of_birth),
            };

            const res = await request('/customers/current', 'PUT', formattedData);

            if(res.statusCode === 200) {

                if(handleEdit) {
                    handleEdit(true);
                }

                toast.success('Profile updated successfully');
            }

        } catch (error) {
            if(handleEdit) {
                handleEdit(false);
            }
            console.log(error);
        }
    };

    return (
        <section>
            {/* <p className="text-zinc-600 text-md font-bold my-4">Profile Picture</p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div className="flex flex-row items-center gap-x-4">
                    <div>
                        <Image
                            width={100}
                            height={100}
                            alt="Profile Image"
                            src={user?.profilePicture || "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"}
                            className="rounded-full object-cover object-center"
                        />
                    </div>
                    <div>
                        <Button color="primary" size="sm">Change picture</Button>
                    </div>
                    <div>
                        <Button color="danger" size="sm" variant="light">Remove picture</Button>
                    </div>
                </div> */}
                <div className="w-full">
                    <h2 className="text-xl font-bold mb-3">Account</h2>
                    <ProfileItem icon={<FaAt size={24} className="text-zinc-600" />} name="Email" value={user?.email} />
                </div>


                <div>
                    <p className="text-black text-lg font-bold mt-8 mb-8"> {title} </p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-4">
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    size="lg"
                                    type="text"
                                    label="First name"
                                    placeholder="Input your first name"
                                    required
                                    labelPlacement="outside"
                                />
                            )}
                        />
                        <Controller
                            name="surname"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    size="lg"
                                    type="text"
                                    label="Surname"
                                    placeholder="Input your surname"
                                    labelPlacement="outside"
                                    required
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                size="lg"
                                type="text"
                                label="Phone number"
                                placeholder="Input your phone number"
                                labelPlacement="outside"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                size="lg"
                                type="text"
                                label="Address"
                                placeholder="Input your address"
                                labelPlacement="outside"
                            />
                        )}
                    />
                    <div className="flex gap-4">
                        <Controller
                            name="is_male"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Gender"
                                    value={[field.value]}
                                    selectedKeys={(field.value === "true" || field.value === true) ? ["true"] : ["false"]}
                                >
                                    <SelectItem key={"true"} value={"true"}>Male</SelectItem>
                                    <SelectItem key={"false"} value={"false"}>Female</SelectItem>
                                </Select>
                            )}
                        />
                        <Controller
                            name="date_of_birth"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    size="sm"
                                    type="date"
                                    label="Date of birth"
                                />
                            )}
                        />
                    </div>
                    {/* <Controller
                        className="hidden"
                        name="about"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Description"
                                placeholder="Edit your description here"
                            />
                        )}
                    /> */}
                </div>
                <Button type="submit" size="md" className="mt-8 mb-12 w-full bg-slate-800 text-slate-100">
                    Save changes
                </Button>
            </form>
        </section>
    );
}
