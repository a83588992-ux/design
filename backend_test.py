#!/usr/bin/env python3
"""
DLIMS License Management Backend API Tests
Tests the license management endpoints for the DLIMS system.
"""

import requests
import json
import sys
from datetime import datetime

# Use the production URL from frontend/.env
BASE_URL = "https://dlims-punjab-clone.preview.emergentagent.com/api"

def test_create_license():
    """Test POST /api/licenses - Create a license record with form data"""
    print("\n=== Testing POST /api/licenses (Create License) ===")
    
    url = f"{BASE_URL}/licenses"
    
    # Test data as specified in the review request
    form_data = {
        'license_no': 'DL-12345678',
        'cnic': '3520112345678',
        'name': 'Muhammad Ahmed',
        'father_husband_name': 'Muhammad Ali',
        'license_category': 'Motor Car (M/CAR)',
        'city': 'Lahore',
        'issue_date': '2024-01-15',
        'expiry_date': '2029-01-15'
    }
    
    try:
        response = requests.post(url, data=form_data, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'success':
                print("✅ License created successfully")
                return True
            else:
                print(f"❌ Unexpected response format: {data}")
                return False
        else:
            print(f"❌ Failed to create license. Status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        print(f"Raw response: {response.text}")
        return False

def test_get_all_licenses():
    """Test GET /api/licenses - Get all licenses"""
    print("\n=== Testing GET /api/licenses (Get All Licenses) ===")
    
    url = f"{BASE_URL}/licenses"
    
    try:
        response = requests.get(url, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'success' and 'data' in data:
                licenses = data['data']
                print(f"✅ Retrieved {len(licenses)} licenses successfully")
                
                # Check if our test license exists
                test_license_found = False
                for license in licenses:
                    if license.get('cnic') == '3520112345678':
                        test_license_found = True
                        print(f"✅ Found test license: {license.get('name')} - {license.get('license_no')}")
                        break
                
                if not test_license_found:
                    print("⚠️ Test license not found in the list")
                
                return True
            else:
                print(f"❌ Unexpected response format: {data}")
                return False
        else:
            print(f"❌ Failed to get licenses. Status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        print(f"Raw response: {response.text}")
        return False

def test_verify_license_found():
    """Test GET /api/licenses/verify/{cnic} - Verify existing license"""
    print("\n=== Testing GET /api/licenses/verify/3520112345678 (Verify Existing License) ===")
    
    cnic = "3520112345678"
    url = f"{BASE_URL}/licenses/verify/{cnic}"
    
    try:
        response = requests.get(url, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'found' and 'data' in data:
                license_data = data['data']
                print(f"✅ License found for CNIC {cnic}")
                print(f"   Name: {license_data.get('name')}")
                print(f"   License No: {license_data.get('license_no')}")
                print(f"   Category: {license_data.get('license_category')}")
                return True
            else:
                print(f"❌ Unexpected response format: {data}")
                return False
        else:
            print(f"❌ Failed to verify license. Status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        print(f"Raw response: {response.text}")
        return False

def test_verify_license_not_found():
    """Test GET /api/licenses/verify/{cnic} - Verify non-existent license"""
    print("\n=== Testing GET /api/licenses/verify/9999999999999 (Verify Non-existent License) ===")
    
    cnic = "9999999999999"
    url = f"{BASE_URL}/licenses/verify/{cnic}"
    
    try:
        response = requests.get(url, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'not_found':
                print(f"✅ Correctly returned 'not_found' status for non-existent CNIC {cnic}")
                return True
            else:
                print(f"❌ Unexpected response format: {data}")
                return False
        else:
            print(f"❌ Failed to verify license. Status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        print(f"Raw response: {response.text}")
        return False

def test_api_health():
    """Test basic API health"""
    print("\n=== Testing API Health ===")
    
    url = f"{BASE_URL}/"
    
    try:
        response = requests.get(url, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('message') == 'Hello World':
                print("✅ API is healthy and responding")
                return True
            else:
                print(f"❌ Unexpected response: {data}")
                return False
        else:
            print(f"❌ API health check failed. Status: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON response: {e}")
        print(f"Raw response: {response.text}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting DLIMS License Management API Tests")
    print(f"Testing against: {BASE_URL}")
    print("=" * 60)
    
    test_results = []
    
    # Test API health first
    test_results.append(("API Health Check", test_api_health()))
    
    # Test license creation
    test_results.append(("Create License", test_create_license()))
    
    # Test getting all licenses
    test_results.append(("Get All Licenses", test_get_all_licenses()))
    
    # Test license verification (found)
    test_results.append(("Verify License (Found)", test_verify_license_found()))
    
    # Test license verification (not found)
    test_results.append(("Verify License (Not Found)", test_verify_license_not_found()))
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    failed = 0
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(test_results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed > 0:
        print("\n❌ Some tests failed. Check the detailed output above.")
        sys.exit(1)
    else:
        print("\n✅ All tests passed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()