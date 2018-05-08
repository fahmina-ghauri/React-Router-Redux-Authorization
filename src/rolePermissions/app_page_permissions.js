 
import Demo from '../components/DemoComponent';

export const page_permissions = [
{
	'url': '/demo',
	'component': Demo,
	'requiredRole': ['admin'] 
// },
// {
// 	'url': '/employee',
// 	'component': HomeEmployee,
// 	'requiredRole': ['admin', 'employee', 'manager'] 
// }
}

];

export const addPagePermissions = (...permisions) => {
	page_permissions.push(...permisions);
}