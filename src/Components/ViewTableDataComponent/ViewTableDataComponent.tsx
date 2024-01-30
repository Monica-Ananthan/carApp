import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import FormDataTableComponent from '../FormDataTableComponent/FormDataTableComponent';
import { Link } from 'react-router-dom';

interface Logo {
    id: number;
    model: string;
    location: string;
    color: string;
    owner: string;
    manufactureYear: string;
    transmission: string;
    insuranceValidity: string;
    externalFitments: string;
    kms: string;
    photo: string;
}

const ViewTableDataComponent: React.FC = () => {
    const formData = useSelector((state: RootState) => state.logo.formData);
    const [filteredData, setFilteredData] = useState<Logo[]>([]);
    const [filterCriteria, setFilterCriteria] = useState<Partial<Logo>>({});

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
    };

    const handleFilterButtonClick = () => {
        const filtered = formData?.filter((data) =>
            Object.entries(filterCriteria).every(([key, value]) =>
                value ? data[key as keyof Logo]?.toString() === value : true
            )
        );
        setFilteredData(filtered || []);
    };

    useEffect(() => {
        setFilteredData(formData || []);
    }, [formData]);

    return (
        <div className='view-data mt-4'>
            <div className='container'>
                <form>
                    <div className='row border-bottom py-3 mb-4'>
                    <div className='col-12 col-md-2'>
                            <Link to="/" className='btn btn-primary w-100'>
                                Back
                            </Link>
                        </div>
                        <div className='col-12 col-md-7'>
                            <h3 className='text-center'>View Page</h3>
                        </div>
                        <div className='col-12 col-md-3'>
                            <button className='w-100 btn btn-success' type='button' onClick={handleFilterButtonClick}>Filter</button>
                        </div>
                    </div>
                    <div className='row'>
                        {formData && Object.keys(formData[0] || {}).map((key) => {
                            const values = new Set<string>();
                            formData.forEach((data) => values.add(data[key as keyof Logo]?.toString() || ''));
                            const uniqueValues = Array.from(values);
                            return (
                                <div key={key} className='col-12 col-md-4'>
                                    <label>{key}</label>
                                    <select className='form-select' name={key} onChange={handleFilterChange}>
                                        <option value=''>All</option>
                                        {uniqueValues.map((value) => (
                                            <option key={value} value={value}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                </form>
                <FormDataTableComponent formData={filteredData} />
            </div>
        </div>
    );
};

export default ViewTableDataComponent;
