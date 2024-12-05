import { PencilIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";

export default function UpdateProfilePage() {
  return (
    <div className=" padding-for-header">
      <div className="container mx-auto px-4 py-8 mb-16">
        <Card className="w-full max-w-md mx-auto bg-black shadow-lg rounded-xl overflow-hidden">
          <CardBody className="p-6">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white truncate">
                Cập nhật thông tin người dùng
              </h3>
            </div>

            <div className="flex flex-col items-center space-y-6 mb-8">
              <div className="bg-gray-800 rounded-full p-4 flex items-center justify-center">
                <PencilIcon className="h-16 w-16 text-white" />
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-2">
                <div className="col-span-2">
                  <Input
                    required
                    label="Tên tài khoản"
                    color="white"
                    className="w-full"
                    defaultValue={"Value..."}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    required
                    label="Họ"
                    color="white"
                    className="w-full"
                    defaultValue={"Value..."}
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    required
                    label="Tên"
                    color="white"
                    className="w-full"
                    defaultValue={"Value..."}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Số điện thoại"
                    color="white"
                    className="w-full"
                    defaultValue={"Value..."}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    required
                    label="Email"
                    type="email"
                    color="white"
                    className="w-full"
                    defaultValue={"Value..."}
                  />
                </div>
              </div>
            </div>
            {false ? (
              <>
                <div className="h-8 md:h-8 text-center w-full text-gray-400 mb-2"></div>
              </>
            ) : (
              <>
                <div className="h-8 md:h-8 text-center w-full text-red-400 mb-2">
                  Something went wrong!!!
                </div>
              </>
            )}
            <div className="mb-4">
              <Button color="white" className="w-full  truncate">
                Cập nhật
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
