import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { config } from '../../utils/config';

const UpdateAccountInfo = () => {

    type FormType = {
        email: string;
        hourlyRate: number;
        affiliation: string;
        [key: string]: any; 
    };
    const [form, setForm] = useState<FormType>({
        email: '',
        hourlyRate: 0,
        affiliation: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`${config.serverUri}/doctors`);
                const requiredDate = {
                    email: response.data.email,
                    hourlyRate: response.data.hourlyRate,
                    affiliation: response.data.affiliation
                }
                setForm(requiredDate);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDoctorData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
        ...form,
        [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Validate form fields
        for (let key in form) {
            if (form[key] === '') {
                alert(`Please fill out ${key}`);
                return;
            }
        }
        try {
            await axios.patch(`${config.serverUri}/doctors/account`, form);
            setSuccess(true);
        } catch (error: any) {
            setError(error.message);
            setSuccess(false);
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Update My Account Info</h1>
            <form onSubmit={handleSubmit}>
                <TextField name="email" label="Email" value={form.email} onChange={handleChange} required />
                <TextField name="hourlyRate" label="Hourly Rate" value={form.hourlyRate} onChange={handleChange} required />
                <TextField name="affiliation" label="Affiliation" value={form.affiliation} onChange={handleChange} required />
                <Button type="submit">Update</Button>
            </form>
            <p style={{color: 'red'}}>{error}</p>
            {success && <p style={{color: 'green'}}>Update is done successfully</p>}
        </div>
    );
};

export default UpdateAccountInfo;
