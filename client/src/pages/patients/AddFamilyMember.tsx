import { ChangeEvent, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { config } from '../../utils/config';

const AddFamilyMember = () => {

    type FormType = {
        nationalId: string;
        name: string;
        birthdate: string;
        gender: string;
        relation: string;
        [key: string]: string; // This line is the index signature
    };
      
    const [form, setForm] = useState<FormType>({
        nationalId: '',
        name: '',
        birthdate: '',
        gender: '',
        relation: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target as HTMLInputElement;
        setForm((form) => ({
          ...form,
          [name]: value
        }));
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
            await axios.post(`${config.serverUri}/patients/family-members`, form);
            setSuccess(true);
        } catch (error: any) {
           setError(error.response.data.message);
           setSuccess(false);
        }
    }

    return (
        <div>
            <h1>Add Family Member</h1>
            <form onSubmit={handleSubmit} style={{marginLeft: '20px',}}>
                <TextField name="nationalId" label="National ID" value={form.nationalId} onChange={handleChange} required />
                <TextField name="name" label="Name" value={form.name} onChange={handleChange} required />
                <TextField name="birthdate" label="Birthdate" type="date" InputLabelProps={{ shrink: true }} value={form.birthdate} onChange={handleChange} required />
                <FormControl>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select labelId="gender-label" name="gender" value={form.gender} onChange={handleChange} required
                    sx={{width: '180px'}}
                    >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="gender-label">Relation</InputLabel>
                    <Select labelId="relation-label" name="relation" value={form.relation} onChange={handleChange} required
                    sx={{width: '180px'}}
                    >
                        <MenuItem value={'wife'}>Wife</MenuItem>
                        <MenuItem value={'husband'}>Husband</MenuItem>
                        <MenuItem value={'children'}>Children</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <Button type="submit">Submit</Button>
            </form>
            <p style={{color: 'red'}}>{error}</p>
            {success && <p style={{color: 'green'}}>Family member is added successfully</p>}
        </div>
    );
};

export default AddFamilyMember;
