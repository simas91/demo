import React, { Component } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import { getAllVehicles } from './client';
import { Table, Avatar, Spin, Icon, Modal, Empty } from 'antd';
import { unmountComponentAtNode } from 'react-dom';
import AddVehicleForm from './forms/AddVehicleForm';
import { errorNotification } from './Notification';
import { LoadingOutlined } from '@ant-design/icons';


const ColorList = ['#00a2ae'];

const getIndicator = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  //stores fetched data from vehicles
  state = {
    vehicles: [],
    isFetching: false,
    isAddVehicleModalVisible: false
  }

  componentDidMount () {
    this.fetchVehicles();
  }

  openAddVehicleModal = () => this.setState({isAddVehicleModalVisible: true})

  closeAddVehicleModal = () => this.setState({isAddVehicleModalVisible: false})

  // fetches all vehicles 
  fetchVehicles = () => {
    this.setState({
      isFetching: true
    });
    getAllVehicles()
    .then(res => res.json()
    .then(vehicles => {
      this.setState({
        vehicles,
        isFetching: false,
      });
    })).catch(error => {
      console.log(error.error);
      const message = error.error.message;
      const description = error.error.error;
      errorNotification(message, message);
      this.setState({isFetching: false});
    });
  }

  render() {

    const { vehicles, isFetching, isAddVehicleModalVisible } = this.state;

    const commonElements = () => (
      <div>
        <Modal 
            title='Add new vehicle'
            visible={isAddVehicleModalVisible}
            onOk={this.closeAddVehicleModal}
            onCancel={this.closeAddVehicleModal}
            width={1000}>
              <AddVehicleForm 
                onSuccess={() => {this.closeAddVehicleModal(); 
                this.fetchVehicles();
                }}
                onFailure = {(error) => {
                  const message = error.error.message;
                  const description = error.error.httpStatus;
                  errorNotification(message, description);
                }}
              />
          </Modal>
          <Footer 
          numberOfVehicles={vehicles.length}
          handleAddVehicleClickEvent={this.openAddVehicleModal}/>
      </div>
    );

    if(isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicator()}></Spin>
        </Container>
      );
    }

    if (vehicles && vehicles.length) {
      
      const columns = [

        {
          title: '',
          key: 'avatar',
          render: (text, vehicle) => (
            <Avatar size='large' style={{backgroundColor: ColorList[0]}}>
              {vehicle.model.toUpperCase()}
            </Avatar>
          )
        },
        {
          title: 'VehicleId',
          dataIndex: 'vehicleId',
          key: 'vehicleId'
        },
        {
          title: 'Registration',
          dataIndex: 'registration',
          key: 'registration'
        },
        {
          title: 'Manufacturer',
          dataIndex: 'manufacturer',
          key: 'manufacturer'
        },
        {
          title: 'Model',
          dataIndex: 'model',
          key: 'model'
        },
        {
          title: 'Year',
          dataIndex: 'year',
          key: 'year'
        },
        {
          title: 'HPI clear',
          dataIndex: 'hpiClear',
          key: 'hpiClear'
        }
      ];

      return (
        <Container>
          <Table 
            style={{marginBottom: '5px'}}
            dataSource={vehicles} 
            columns={columns} 
            pagination={false}
            rowKey='vehicleId'/>
            {commonElements()}
        </Container>
      );

    }
    
    return (
      <Container>
      <Empty description={
        <h1>No Vehicles found</h1>
      }/>
      {commonElements()}
      </Container>
    )
  }
}

export default App;
