export const API = {
  // 业务面板
  professional: {
    /**
     *导入失败率分布
     */
    importErrorRate: "tech-ops/dashboard/importErrorRate",
    /**
     * 合作方调用排行
     */
    cooperation: "tech-ops/dashboard/cooperationInvokeTimes",
    /**
     * 累计导入业务数据总成功数&&导入业务数据成功趋势
     */
    importSuccTimes: "tech-ops/dashboard/importSuccTimes",
    /**
     * 成功率实时趋势
     */
    importSuccRate: "tech-ops/dashboard/importSuccRate",
    /**
     * 导入成功数
     */
    importSuccRate2: "tech-ops/dashboard/importSuccRate2",
    /**
     * 业务数据导入数
     */
    importData: "tech-ops/dashboard/importData",
    /**
     * 转化率
     */
    convertRate: "tech-ops/dashboard/convertRate"
  },
  earlyWarn: {
    /**
     * 业务预警趋势
     */
    professionWarn: "tech-ops/dashboard/warning/classify/stat",
    /**
     * 实时预警和今日预警总数
     */
    realTimeTrend: "tech-ops/dashboard/warning/summary/stat",
    /**
     * 紧急预警
     */
    emergencyHook: "tech-ops/dashboard/warning/topRank",
    /**
     * 预警总览
     */
    totalOverview: "tech-ops/dashboard/warning/all",
    /**
     * 指标波动
     */
    directiveFlux: "tech-ops/dashboard/warning/metric",
    /**
     * 预警类型分布
     */
    typeDistribution: "tech-ops/dashboard/warning/type/stat"
  },

  hardWare: {
    /**
     * 今日内存使用率T10
     */
    memoryUsage: "tech-ops/dashboard/hardware/status/memory",
    /**
     * 硬件状态分布
     */
    hardwareStatus: "tech-ops/dashboard/hardware/warning/stat",
    /**
     * 设备信息
     */
    deviceInfo: "tech-ops/dashboard/hardware/equipment/stat",
    /**
     * 获取主机ID
     */
    getHostId: "tech-ops/dashboard/hardware/status/hostids",
    /**
     * 数据库状态
     */
    getDatabaseStatus: "tech-ops/dashboard/hardware/status/db",
    /**
     * 网络设备状态
     */
    getNetDeviceStatus: "tech-ops/dashboard/hardware/status/nic",
    /**
     * 主机性能
     */
    getTotalStatus: "tech-ops/dashboard/hardware/status/host",
    /**
     * 硬件预警信息
     */
    hardwareWarn: "tech-ops/dashboard/hardware/warning"
  }
};
