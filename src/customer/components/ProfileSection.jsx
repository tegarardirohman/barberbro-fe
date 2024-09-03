import {Button, DatePicker, Image, Input, Select, SelectItem, Textarea} from "@nextui-org/react";

export default function ProfileSection() {
    return (
        <section className="px-14">
            <p className="text-zinc-600 text-md font-bold my-4">Profile Picture</p>
            <form className="">
                <div className="flex flex-row items-center gap-x-4">
                    <div>
                        <Image
                            width={100}
                            height={100}
                            alt="Profile Image"
                            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                            className="rounded-full object-cover object-center"
                        />
                    </div>
                    <div>
                        <Button color="primary" size="sm">Change picture</Button>
                    </div>
                    <div>
                        <Button color="danger" size="sm" variant="light">Remove picture</Button>
                    </div>
                </div>
                <div>
                    <p className="text-zinc-600 text-md mt-8 mb-4">Edit your profile info</p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Input size="sm" type="text" label="First name"/>
                    <Input size="sm" type="text" label="Surname"/>
                    <Input size="sm" type="text" label="Phone number"/>
                    <Input size="sm" type="text" label="Address"/>
                    <Select label="Gender">
                        <SelectItem>Male</SelectItem>
                        <SelectItem>Female</SelectItem>
                        <SelectItem>Prefer not to say</SelectItem>
                    </Select>
                    <DatePicker size="sm" label="Date of birth"/>
                    <Textarea label="Description" placeholder="edit your description here"/>
                </div>
                <Button size="md" color="primary" className="my-4">Save changes</Button>
            </form>
        </section>
    )
}