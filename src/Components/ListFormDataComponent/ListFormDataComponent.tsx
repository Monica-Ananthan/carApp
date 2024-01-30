import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLogo, selectFormData } from '../../Redux/Reducer/logoSlice';
import FormDataTableComponent from '../FormDataTableComponent/FormDataTableComponent';

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
interface Image {
    imageUrl: string;
    label: string;
}

const ListFormDataComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Logo>({
        id: 0,
        model: '',
        location: '',
        color: '',
        owner: '',
        manufactureYear: '',
        transmission: '',
        insuranceValidity: '',
        externalFitments: '',
        kms: '',
        photo: '',
    });
    const [imageList, setImageList] = useState<Image[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [submittedData, setSubmittedData] = useState<Logo[]>([]);

    useEffect(() => {
        fetch('/mocks/logo.json')
            .then(response => response.json())
            .then(data => {
                setImageList(data.images);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    }, []);
  
    const handleLogoClick = (index: number) => {
        const selectedImage = imageList[index];
        setSelectedModel(selectedImage.label);
        setShowForm(true);
        setFormData({
            id: formData.id + 1,
            model: selectedImage.label,
            location: '',
            color: '',
            owner: '',
            manufactureYear: '',
            transmission: '',
            insuranceValidity: '',
            externalFitments: '',
            kms: '',
            photo: '',
        });
    };

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log("Name:", name, "Value:", value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
  
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted. FormData:", formData);
        dispatch(addLogo(formData));
        setSubmittedData(prevData => [...prevData, formData]);
        setShowForm(false);
    };

    return (
        <div className='logo-wrap mt-4'>
            <div className='container'>
            <div className='row'>
                {imageList.map((image, index) => (
                    <div key={index} className="col-12 col-md-3">
                        <div className='card mb-3' onClick={() => handleLogoClick(index)}>
                            <div className='card-body'>
                                <img className='car-logo' src={process.env.PUBLIC_URL + image.imageUrl} alt={`logo-${index}`} />
                                <label>{image.label}</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showForm && (
                <form onSubmit={handleSubmit} className='mt-4'>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Model</label>
                                <input className="form-control" type="text" name="model" value={selectedModel} onChange={handleChange} placeholder="Model" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Location</label>
                                <input className="form-control" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Color</label>
                                <input className="form-control" type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>No of Owners</label>
                                <input className="form-control" type="text" name="owner" value={formData.owner} onChange={handleChange} placeholder="No of Owner" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Year of Manufacture</label>
                                <input className="form-control" type="text" name="manufactureYear" value={formData.manufactureYear} onChange={handleChange} placeholder="Year of Manufacture" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Transmission</label>
                                <input className="form-control" type="text" name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Insurance valid upto</label>
                                <input className="form-control" type="text" name="insuranceValidity" value={formData.insuranceValidity} onChange={handleChange} placeholder="Insurance Validity" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>External Fitments</label>
                                <input className="form-control" type="text" name="externalFitments" value={formData.externalFitments} onChange={handleChange} placeholder="External Fitments" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>KMS</label>
                                <input className="form-control" type="text" name="kms" value={formData.kms} onChange={handleChange} placeholder="KMS" />
                            </div>
                        </div>
                        <div className='col-12 col-md-4'>
                            <div className='input-group'>
                                <label>Photo</label>
                                <input className="form-control" type="file" name="photo" onChange={handlePhotoChange} accept="image/*" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn btn-primary m-2 w-100'>Submit</button>
                </form>
            )}
            <FormDataTableComponent formData={submittedData} />
            </div>
        </div>
    );
};

export default ListFormDataComponent;
